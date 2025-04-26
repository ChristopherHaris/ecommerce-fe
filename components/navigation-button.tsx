"use client";

import * as React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Button from "./ui/button";
import { ShoppingBag } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

interface NavigationButtonProps {
  cartLength: number;
}

const data = [
  { name: "Shopping Cart", href: "cart" },
  { name: "Orders", href: "order"},
];

export default function NavigationButton({
  cartLength,
}: NavigationButtonProps) {
  const pathname = usePathname();
  const routes = data.map((route) => ({
    href: `/${route.href}`,
    label: route.name,
    active: pathname === `/${route.href}`,
  }));
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="flex items-center rounded-full bg-black mx-2 px-4 py-2">
          <ShoppingBag size={20} color="white" />
          <span className="ml-2 text-sm font-medium text-white">
            {cartLength}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Menu</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={pathname}>
          {routes.map((route) => (
            <DropdownMenuRadioItem key={route.href} value={route.href} onClick={() => router.push(route.href)} className="text-sm sm:text-base font-medium transition-colors hover:text-black hover:dark:text-white">{route.label}</DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
