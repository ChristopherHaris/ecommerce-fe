import React from "react";
import Container from "./ui/container";
import Link from "next/link";
import MainNav from "./main-nav";
import getCategories from "@/actions/get-categories";
import NavbarActions from "./navbar-actions";
import getStore from "@/actions/get-store";

export const revalidate = 0;

const Navbar = async () => {
  const store = await getStore();
  const categories = await getCategories();

  return (
    <div className="border-b">
      <Container>
        <div className="relative px-4 sm:px-6 lg:px-8 flex h-16 items-center">
          <Link href="/" className="ml-4 flex lg:ml-0 gap-x-2">
            <p className="font-bold text-xl">{store.name}</p>
          </Link>
          <MainNav data={categories} />
          <NavbarActions data={categories} />
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
