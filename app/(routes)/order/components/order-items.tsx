"use client";

import Currency from "@/components/ui/currency";
import { cn } from "@/lib/utils";
import { Order, Product } from "@/types";
import Image from "next/image";

interface OrderItemProps {
  data: Order;
  prefetchedItems: Array<{
    product: Product;
    id: string;
    orderId: string;
    productId: string;
    buyQuantity: number;
  }>;
}

const OrderItem: React.FC<OrderItemProps> = ({ data, prefetchedItems }) => {
  return (
    <>
      {prefetchedItems.map((item) => (
        <li key={item.id} className="flex py-6 border-b">
          <div className="relative h-24 w-24 overflow-hidden rounded-md sm:h-48 sm:w-48">
            <Image
              className="object-cover object-center"
              fill
              src={item.product.images[0].url}
              alt={item.product.name}
            />
          </div>
          <div className="relative ml-4 flex flex-1 flex-col justify-between sm:ml-6">
            <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
              <div className="flex justify-between">
                <p className="text-lg font-semibold text-black">
                  {item.product.name}
                </p>
              </div>
              <div className="mt-1 flex text-sm">
                {item.product.colors && item.product.isColor && (
                  <p className="text-gray-500">{item.product.colors.name}</p>
                )}
                {item.product.sizes && item.product.isSize && (
                  <p className="ml-4 border-l border-gray-200 pl-4">
                    {item.product.sizes.name}
                  </p>
                )}
              </div>
              <div className="mt-1 text-sm font-medium text-gray-900">
                <Currency value={item.product.price} />
              </div>
            </div>
            <div className="mt-2 text-sm text-gray-500">
              Subtotal:{" "}
              <Currency
                value={(
                  parseFloat(item.product.price) * item.buyQuantity
                ).toString()}
              />
            </div>
          </div>
          <div className="flex flex-col flex-1 items-end justify-between text-sm">
            <div className="flex flex-col items-end gap-0.5">
              <p
                className={cn("text-sm font-medium", {
                  "text-green-600": data.confirm === "CONFIRM",
                  "text-red-600": data.confirm === "DENY",
                  "text-yellow-600": data.confirm === "PENDING",
                })}
              >
                {data.confirm === "CONFIRM"
                  ? "Confirmed"
                  : data.confirm === "DENY"
                  ? "Denied"
                  : "Pending"}
              </p>
              <p className="text-xs text-gray-500">
                {item.product.isPreOrder && "Pre-Order"}
              </p>
            </div>
            <p className="text-sm font-medium text-gray-900">
              {item.buyQuantity} x{" "}
            </p>
          </div>
          <div></div>
        </li>
      ))}
    </>
  );
};

export default OrderItem;
