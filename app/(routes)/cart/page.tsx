"use client";

import Container from "@/components/ui/container";
import useCart from "@/hooks/use-cart";
import { useState, useEffect } from "react";
import CartItem from "./components/cart-item";
import Summary from "./components/summary";
import getStore from "@/actions/get-store";
import { Store } from "@/types";

const CartPage = () => {
  const [store, setStore] = useState<Store | null>(null);
  const cart = useCart();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    getStore().then((store) => {
      setStore(store);
    });
  }, []);

  useEffect(() => {
    setIsMounted(true);

    if (store && store.isGateway) {
      const snapScript = "https://app.midtrans.com/snap/snap.js";
      const clientKey = process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY;

      const script = document.createElement("script");
      script.src = snapScript;
      script.setAttribute("data-client-key", clientKey!);
      script.async = true;

      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    }
  }, [store]);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="bg-white">
      <Container>
        <div className="px-4 py-16 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-black">Shopping Cart</h1>
          <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start gap-x-12">
            <div className="lg:col-span-7">
              {cart.items.length === 0 && (
                <p className="text-neutral-500">Your cart is empty.</p>
              )}
              <ul>
                {cart.items.map((item) => (
                  <CartItem key={item.id} data={item} />
                ))}
              </ul>
            </div>
            {store && <Summary store={store} />}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CartPage;
