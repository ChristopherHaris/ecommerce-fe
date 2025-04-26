"use client";

import { useEffect, useState } from "react";
import useCart from "@/hooks/use-cart";
import { SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import MobileMenus from "./mobile-menu";
import { Category } from "@/types";
import NavigationButton from "./navigation-button";

interface NavbarActionsProps {
  data: Category[];
}

const NavbarActions = ({ data }: NavbarActionsProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const cart = useCart();

  if (!isMounted) {
    return null;
  }

  return (
    <div className="ml-auto flex items-center gap-x-2">
      <div className="hidden sm:flex">
        <NavigationButton cartLength={cart.items.length}/>
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

