"use client";
import Currency from "@/components/ui/currency";
import IconButton from "@/components/ui/icon-button";
import useCart from "@/hooks/use-cart";
import { Product } from "@/types";
import { Minus, Plus, X } from "lucide-react";
import Image from "next/image";
import React from "react";

interface CartItemProps {
  data: Product & { selectedQuantity?: number };
}

const CartItem: React.FC<CartItemProps> = ({ data }) => {
  const cart = useCart();

  const onRemove = () => {
    cart.removeItem(data.id);
  };

  const handleIncrement = () => {
    cart.addQuantity(data.id);
  };

  const handleDecrement = () => {
    cart.decreaseQuantity(data.id);
  };

  // Convert quantity to number for comparisons
  const quantity = data.selectedQuantity || 1;
  const maxQuantity = parseInt(String(data.quantity)) || 10;

  return (
    <li className="flex py-6 border-b">
      <div className="relative h-24 w-24 overflow-hidden rounded-md sm:h-48 sm:w-48">
        <Image
          className="object-cover object-center"
          fill
          src={data.images[0].url}
          alt={data.name}
        />
      </div>
      <div className="relative ml-4 flex flex-1 flex-col justify-between sm:ml-6">
        <div className="absolute z-10 top-0 right-0">
          <IconButton onClick={onRemove} icon={<X size={15} />} />
        </div>
        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
          <div className="flex justify-between">
            <p className="text-lg font-semibold text-black">{data.name}</p>
          </div>
          <div className="mt-1 flex text-sm">
            {data.colors && data.isColor && <p className="text-gray-500">{data.colors.name}</p>}
            {data.sizes && data.isSize && (
              <p className="ml-4 border-l border-gray-200 pl-4">
                {data.sizes.name}
              </p>
            )}
          </div>
          <div className="mt-1 text-sm font-medium text-gray-900">
            <Currency value={data.price} />
          </div>
        </div>
        <div className="flex items-center gap-x-3 my-2">
          <IconButton
            className="rounded-md"
            icon={<Minus size={15} />}
            onClick={handleDecrement}
          />
          <div className="w-16 h-10 flex items-center justify-center border rounded-md">
            {quantity}
          </div>
          <IconButton
            className="rounded-md"
            icon={<Plus size={15} />}
            onClick={handleIncrement}
            disabled={quantity >= maxQuantity}
          />
        </div>
        <div className="mt-2 text-sm text-gray-500">
          Subtotal:{" "}
          <Currency value={(parseFloat(data.price) * quantity).toString()} />
        </div>
      </div>
    </li>
  );
};

export default CartItem;
