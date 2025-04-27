"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Category } from "@/types";

interface MainNavProps {
  data: Category[];
}

const MainNav: React.FC<MainNavProps> = ({ data }) => {
  const pathname = usePathname();
  const sortedData = data.sort((a, b) => {
    if (a.name === "Pre Order") return 1;
    if (b.name === "Pre Order") return -1;
    return 0;
  });
  const routes = sortedData.map((route) => ({
    href: `/category/${route.id}`,
    label: route.name,
    active: pathname === `/category/${route.id}`,
  }));

  return (
    <nav className="hidden lg:flex mx-1 items-center overflow-x-auto space-x-3 lg:mx-6 lg:space-x-6">
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "text-sm sm:text-base font-medium transition-colors hover:text-black hover:dark:text-white",
            route.active
              ? "text-black dark:text-white"
              : "text-neutral-500 dark:text-neutral-400"
          )}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  );
};

export default MainNav;

