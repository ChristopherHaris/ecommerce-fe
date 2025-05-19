import { Suspense } from "react";
import Container from "@/components/ui/container";
import MobileFilters from "./components/mobile-filters";
import CategoryBillboard from "./components/category-billboard";


import getSizes from "@/actions/get-sizes";
import getColors from "@/actions/get-colors";
import BillboardSkeleton from "@/components/skeleton/billboard-skeleton";
import FiltersSkeleton from "@/components/skeleton/filter-skeleton";
import CategoryFilters from "./components/category-filters";
import CategoryProducts from "./components/category-products";
import ProductSkeleton from "@/components/skeleton/product-skeleton";

export const revalidate = 0;

interface CategoryPageProps {
  params: Promise<{ categoryId: string }>;
  searchParams: Promise<{
    colorId?: string;
    sizeId?: string;
  }>;
}

const CategoryPage: React.FC<CategoryPageProps> = async ({
  params,
  searchParams,
}) => {
  const { categoryId } = await params;
  const { colorId, sizeId } = await searchParams;

  return (
    <div className="bg-white">
      <Container>
        {/* Billboard section with Suspense */}
        <Suspense fallback={<BillboardSkeleton />}>
          <CategoryBillboard categoryId={categoryId} />
        </Suspense>

        <div className="p-4 sm:p-6 lg:p-8 px-4 sm:px-6 lg:px-8 pb-24">
          <div className="lg:grid lg:grid-cols-5 lg:gap-x-8">
            {/* Mobile filters - will receive filters via props */}
            <Suspense
              fallback={<div className="lg:hidden">Loading filters...</div>}
            >
              <MobileFiltersWrapper />
            </Suspense>

            {/* Desktop filters with Suspense */}
            <div className="hidden lg:block">
              <Suspense fallback={<FiltersSkeleton />}>
                <CategoryFilters />
              </Suspense>
            </div>

            {/* Products grid with Suspense */}
            <div className="mt-6 lg:col-span-4 lg:mt-0">
              <Suspense fallback={<ProductSkeleton />}>
                <CategoryProducts
                  categoryId={categoryId}
                  colorId={colorId}
                  sizeId={sizeId}
                />
              </Suspense>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

// Wrapper component to fetch and pass data to MobileFilters
const MobileFiltersWrapper = async () => {
  const sizes = await getSizes();
  const colors = await getColors();

  return <MobileFilters sizes={sizes} colors={colors} />;
};

export default CategoryPage;
