"use client";

import sendEmail from "@/actions/send-email";
import updatePaidStatus from "@/actions/update-paid-status";
import Button from "@/components/ui/button";
import Currency from "@/components/ui/currency";
import IconButton from "@/components/ui/icon-button";
import useCart from "@/hooks/use-cart";
import { SignedIn, SignedOut, SignIn, useUser } from "@clerk/nextjs";
import axios from "axios";
import { Loader2 } from "lucide-react";
import React from "react";
import { toast } from "sonner";

const Summary = () => {
  const [loading, setLoading] = React.useState(false);
  const items = useCart((state) => state.items);
  const removeAll = useCart((state) => state.removeAll);
  const { user } = useUser();

  const totalPrice = items.reduce((total, item) => {
    const itemPrice = Number(item.price);
    const quantity = item.selectedQuantity;
    return total + itemPrice * quantity;
  }, 0);

  const totalItems = items.reduce((total, item) => {
    return total + (item.selectedQuantity);
  }, 0);

  const onCheckout = async () => {
    setLoading(true);
    const productIds = items.map((item) => ({
      id: item.id,
      quantity: item.selectedQuantity,
    }));

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/checkout`,
        {
          productIds: productIds.map((item) => item.id),
          userId: user?.id,
          quantities: productIds.map((item) => item.quantity),
          name: user?.fullName,
          email: user?.emailAddresses[0].emailAddress,
        }
      );

      window.snap.pay(response.data.token, {
        onSuccess: async function (result: unknown) {
          toast.success("Payment completed.");
          toast.info("Thank You For Your Purchase.", {
            description: "Please check your email for your purchase deatils.",
          });
          setLoading(false);
          updatePaidStatus(response.data.orderId);
          sendEmail(user, response.data.orderId);
          removeAll();
          console.log("success:", result);
        },
        onError: function (result: unknown) {
          toast.error("Something went wrong.");
          console.log(result);
          setLoading(false);
        },
        onClose: function () {
          setLoading(false);
          toast.error("Payment cancelled.");
          console.log("order closed");
        },
      });
    } catch (error) {
      toast.error("Failed to initialize checkout.");
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <>
      <SignedIn>
        <div className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
          <h2 className="text-base sm:text-lg font-medium text-gray-900">Order Summary</h2>
          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between border-t border-gray-200 pt-4">
              <div className="text-sm sm:text-base font-medium text-gray-900">
                Order total ({totalItems} {totalItems === 1 ? "item" : "items"})
              </div>
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
      </SignedIn>
      <SignedOut>
        <div className="mt-16 flex flex-col items-center rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
          <h2 className="text-lg font-medium text-gray-900">
            Please Sign In to Checkout
          </h2>
          <p className="mb-6 text-gray-500">*please use UBM email</p>
          <SignIn />
        </div>
      </SignedOut>
    </>
  );
};

export default Summary;
