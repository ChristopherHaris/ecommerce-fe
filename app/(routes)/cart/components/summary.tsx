"use client";

import Button from "@/components/ui/button";
import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";
import axios from "axios";
import React from "react";
import { toast } from "sonner";

const Summary = () => {
  const items = useCart((state) => state.items);
  const removeAll = useCart((state) => state.remolveAll);

  const totalPrice = items.reduce((total, item) => {
    return total + Number(item.price);
  }, 0);

  const onCheckout = async () => {
    const productIds = items.map((item) => item.id);
    console.log(productIds);
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/checkout`,
      {
        productIds,
      }
    );

    console.log(response.data);

    window.snap.pay(response.data.token, {
      onSuccess: function (result: unknown) {
        toast.success("Payment completed.");
        removeAll();
        console.log(result);
      },
      onPending: function (result: unknown) {
        console.log(result);
      },
      onError: function (result: unknown) {
        toast.error("Something went wrong.");
        console.log(result);
      },
    });
  };

  return (
    <div className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
      <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>
      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <div className="text-base font-medium text-gray-900">Order total</div>
          <Currency value={totalPrice} />
        </div>
      </div>
      <Button onClick={onCheckout} className="w-full mt-6">
        Check Out
      </Button>
    </div>
  );
};

export default Summary;
