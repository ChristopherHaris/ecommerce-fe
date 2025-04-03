"use client";

import { useEffect, useState } from "react";
import Button from "./ui/button";
import { ShoppingBag } from "lucide-react";
import useCart from "@/hooks/use-cart";
import { useRouter } from "next/navigation";
import { SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import MobileMenus from "./mobile-menu";
import { Category } from "@/types";

interface NavbarActionsProps {
  data: Category[];
}

const NavbarActions = ({ data }: NavbarActionsProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const router = useRouter();
  const cart = useCart();

  if (!isMounted) {
    return null;
  }

  return (
    <div className="ml-auto flex items-center gap-x-2">
      <div className="hidden sm:flex">
        <Button
          onClick={() => router.push("/cart")}
          className="flex items-center rounded-full bg-black mx-2 px-4 py-2"
        >
          <ShoppingBag size={20} color="white" />
          <span className="ml-2 text-sm font-medium text-white">
            {cart.items.length}
          </span>
        </Button>
      </div>
      <div className="flex sm:hidden">
        <MobileMenus data={data}/>
      </div>
      <UserButton />
      <SignedOut>
        <SignInButton forceRedirectUrl={"/"} mode="modal">
          <button className="flex items-center text-white rounded-full text-sm bg-black px-2 py-2 lg:px-4 lg:py-2">
            Sign In
          </button>
        </SignInButton>
      </SignedOut>
    </div>
  );
};

export default NavbarActions;

