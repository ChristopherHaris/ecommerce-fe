"use client";

import updatePaidStatus from "@/actions/update-paid-status";
import Button from "@/components/ui/button";
import Currency from "@/components/ui/currency";
import IconButton from "@/components/ui/icon-button";
import useCart from "@/hooks/use-cart";
import axios from "axios";
import { Loader2 } from "lucide-react";
import React from "react";
import { toast } from "sonner";

const Summary = () => {
  const [loading, setLoading] = React.useState(false);

  const items = useCart((state) => state.items);
  const removeAll = useCart((state) => state.remolveAll);

  const totalPrice = items.reduce((total, item) => {
    return total + Number(item.price);
  }, 0);

  const onCheckout = async () => {
    setLoading(true);
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
        setLoading(false);
        updatePaidStatus(response.data.orderId);
        removeAll();
        console.log("success:", result);
      },
      onError: function (result: unknown) {
        toast.error("Something went wrong.");
        console.log(result);
      },
      onClose: function () {
        toast.error("Payment cancelled.");
        console.log("order closed");
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
      {loading ? (
        <IconButton
          onClick={onCheckout}
          className="w-full mt-6"
          icon={<Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        />
      ) : (
        <Button
          disabled={items.length === 0}
          onClick={onCheckout}
          className="w-full mt-6"
        >
          Check Out
        </Button>
      )}
    </div>
  );
};

export default Summary;
