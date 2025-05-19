import Container from "@/components/ui/container";
import React, { Suspense } from "react";
import ProductListSkeleton from "@/components/skeleton/product-list-skeleton";
import FeaturedProducts from "@/components/featured-products";
import HomePageBillboard from "@/components/home-page-billboard";
import BillboardSkeleton from "@/components/skeleton/billboard-skeleton";

export const revalidate = 0;

const HomePage = async () => {
  return (
    <Container>
      <div className="space-y-10 pb-10">
        <Suspense fallback={<BillboardSkeleton />}>
          <HomePageBillboard />
        </Suspense>
        <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
          <Suspense
            fallback={<ProductListSkeleton title="Featured Products" />}
          >
            <FeaturedProducts />
          </Suspense>
        </div>
      </div>
    </Container>
  );
};

export default HomePage;
