import { Product } from "@/types";
import { toast } from "sonner";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface CartItem extends Product {
  selectedQuantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (data: Product) => void;
  removeItem: (id: string) => void;
  removeAll: () => void;
  addQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
}

const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      items: [],
      addItem: (data: Product) => {
        const currentItems = get().items;
        const existingItem = currentItems.find((item) => item.id === data.id);

        if (existingItem) {
          return toast.error("Item already in cart.");
        }

        // Add new item with selectedQuantity set to 1
        const newItem: CartItem = {
          ...data,
          selectedQuantity: 1,
        };

        set({ items: [...get().items, newItem] });
        toast.success("Item added to cart.");
      },
      removeItem: (id: string) => {
        set({ items: [...get().items.filter((item) => item.id !== id)] });
        toast.success("Item removed from cart.");
      },
      removeAll: () => {
        set({ items: [] });
        // toast.success("Cart cleared.");
      },
      addQuantity: (id: string) => {
        const currentItems = get().items;
        const itemToUpdate = currentItems.find((item) => item.id === id);

        if (!itemToUpdate) return;

        // Parse the quantity values to numbers for comparison
        const currentQuantity = itemToUpdate.selectedQuantity || 1;
        const maxQuantity = parseInt(String(itemToUpdate.quantity)) || 10;

        // Check if current quantity is less than maximum available
        if (currentQuantity < maxQuantity) {
          const updatedItems = currentItems.map((item) =>
            item.id === id
              ? { ...item, selectedQuantity: currentQuantity + 1 }
              : item
          );

          set({ items: updatedItems });
        } else {
          toast.error(`Cannot add more than ${maxQuantity} items.`);
        }
      },
      decreaseQuantity: (id: string) => {
        const currentItems = get().items;
        const itemToUpdate = currentItems.find((item) => item.id === id);

        if (!itemToUpdate) return;

        const currentQuantity = itemToUpdate.selectedQuantity || 1;

        if (currentQuantity <= 1) {
          get().removeItem(id);
          return;
        }

        const updatedItems = currentItems.map((item) =>
          item.id === id
            ? { ...item, selectedQuantity: currentQuantity - 1 }
            : item
        );

        set({ items: updatedItems });
      },
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCart;