"use client";

import Button from "@/components/ui/button";
import IconButton from "@/components/ui/icon-button";
import useCart from "@/hooks/use-cart";
import { cn } from "@/lib/utils";
import { Category } from "@/types";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Menu, Package, ShoppingBag, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

interface MobileMenusProps {
  data: Category[];
}

const MobileMenus: React.FC<MobileMenusProps> = ({ data }) => {
  const [open, setOpen] = React.useState(false);
  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);

  const router = useRouter();
  const cart = useCart();

  const pathname = usePathname();
  const routes = data.map((route) => ({
    href: `/category/${route.id}`,
    label: route.name,
    active: pathname === `/category/${route.id}`,
  }));

  return (
    <>
      <Button
        className="flex items-center rounded-full bg-black mx-2 px-4 py-2"
        onClick={onOpen}
      >
        <Menu size={20} color="white" />
      </Button>
      <Dialog
        className="relative z-40 lg:hidden"
        as="div"
        open={open}
        onClose={onClose}
      >
        <div className="fixed inset-0 bg-black bg-opacity-25" />
        <div className="fixed inset-0 z-40 flex">
          <DialogPanel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-6 shadow-xl">
            <div className="flex items-center justify-end px-4">
              <IconButton icon={<X size={15} />} onClick={onClose} />
            </div>
            <div className="flex flex-col p-4 gap-2">
              <Button
                onClick={() => {
                  router.push("/cart");
                  onClose();
                }}
                className="flex items-center justify-center rounded-lg bg-black mx-auto px-4 py-2 w-full"
              >
                <ShoppingBag size={20} color="white" />
                <span className="ml-2 text-sm font-medium text-white">
                  {cart.items.length}
                </span>
              </Button>
              <Button
                onClick={() => {
                  router.push("/order");
                  onClose();
                }}
                className="flex items-center justify-center rounded-lg bg-black mx-auto px-4 py-2 w-full"
              >
                <Package size={20} color="white" />
                <span className="ml-2 text-sm font-medium text-white">
                  Order
                </span>
              </Button>
              {routes.map((route) => (
                <Button
                  key={route.href}
                  onClick={() => {
                    router.push(route.href);
                    onClose();
                  }}
                  className={cn(
                    "flex items-center justify-center rounded-lg bg-transparent  mx-auto px-4 py-2 w-full text-sm font-medium",
                    route.active
                      ? "text-black"
                      : "text-neutral-500 dark:text-neutral-400"
                  )}
                >
                  {route.label}
                </Button>
              ))}
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
};

export default MobileMenus;
