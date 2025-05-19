import getBillboards from "@/actions/get-billboards";
import Billboard from "@/components/billboard";
import Container from "@/components/ui/container";
import React, { Suspense } from "react";
import ProductListSkeleton from "@/components/skeleton/product-list-skeleton";
import FeaturedProducts from "@/components/featured-products";

export const revalidate = 0;

const HomePage = async () => {
  // Only fetch billboard data in the main component
  const billboards = await getBillboards(
    "25a66c77-a5d4-4123-8964-83bc56841f07"
  );

  return (
    <Container>
      <div className="space-y-10 pb-10">
        <Billboard data={billboards} />
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
