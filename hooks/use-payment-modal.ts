import { Store } from "@/types";
import { create } from "zustand";

interface PaymentModalStore {
  isOpen: boolean;
  isDone: boolean;
  data?: Store;
  onOpen: (data: Store) => void;
  onDone: () => void;
  onClose: () => void;
}

const usePaymentModal = create<PaymentModalStore>((set) => ({
  isOpen: false,
  isDone: false,
  data: undefined,
  onOpen: (data: Store) => set({ data, isOpen: true, isDone: false }),
  onDone: () => set({ isDone: true }),
  onClose: () => set({ isOpen: false }),
}));

export default usePaymentModal;
