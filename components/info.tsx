"use client";

import { Product } from "@/types";
import React, { MouseEventHandler } from "react";
import Currency from "./ui/currency";
import Button from "./ui/button";
import { ShoppingCart } from "lucide-react";
import useCart from "@/hooks/use-cart";

interface InfoProps {
  data: Product;
}

const Info: React.FC<InfoProps> = ({ data }) => {
  const cart = useCart();

  const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();

    cart.addItem(data);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900">{data.name}</h1>
      <div className="mt-3 flex items-end justify-between">
        <div className="text-2xl text-gray-900">
          <Currency value={data?.price} />
        </div>
      </div>
      <hr className="my-4" />
      <div className="flex flex-col gap-y-3 mb-6">
        {data.isSize && (
          <div className="flex items-center gap-x-4">
            <h3 className="font-semibold text-black">Size:</h3>
            <div>{data?.sizes?.name}</div>
          </div>
        )}
        {data.isDimension && (
          <div className="flex flex-col gap-y-1">
            <div className="flex items-center gap-x-4">
              <h3 className="font-semibold text-black">Dimensions:</h3>
              {data.length && data.width && data.height && (
                <div>
                  {data?.length} cm x {data?.width} cm x {data?.height} cm
                </div>
              )}
            </div>
            <p className="text-xs text-gray-500">length x width x height</p>
          </div>
        )}
        {data.isWeight && (
          <div className="flex flex-col gap-y-1">
            <div className="flex items-center gap-x-4">
              <h3 className="font-semibold text-black">Weight:</h3>
              <div>{data.weight} g</div>
            </div>
            <p className="text-xs text-gray-500">weight (grams)</p>
          </div>
        )}
        {data.isColor && (
          <div className="flex items-center gap-x-4">
            <h3 className="font-semibold text-black">Color:</h3>
            <div
              className="h-6 w-6 rounded-full border border-gray-600"
              style={{ backgroundColor: data?.colors?.value }}
            />
          </div>
        )}
      </div>
      <div className="mt-3 flex items-end justify-between">
        <div className="text-sm text-gray-500">{data.description}</div>
      </div>
      <div className="mt-10 flex items-center justify-between gap-x-3">
        <Button className="flex items-center gap-x-2" onClick={onAddToCart}>
          Add to Cart
          <ShoppingCart />
        </Button>
      </div>
    </div>
  );
};

export default Info;
