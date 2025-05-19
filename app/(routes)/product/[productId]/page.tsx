import { Suspense } from "react";
import Container from "@/components/ui/container";
import ProductGallery from "@/components/gallery/product-gallery";
import ProductListSkeleton from "@/components/skeleton/product-list-skeleton";
import GallerySkeleton from "@/components/skeleton/gallery-skeleton";
import InfoSkeleton from "@/components/skeleton/info-skeleton";
import ProductInfo from "@/components/product-info";
import RelatedProducts from "@/components/related-products";

interface ProductPageProps {
  params: Promise<{ productId: string }>;
}

const ProductPage: React.FC<ProductPageProps> = async ({ params }) => {
  const { productId } = await params;

  return (
    <div className="bg-white">
      <Container>
        <div className="px-4 py-10 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
            <Suspense fallback={<GallerySkeleton />}>
              <ProductGallery productId={productId} />
            </Suspense>

            <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
              <Suspense fallback={<InfoSkeleton />}>
                <ProductInfo productId={productId} />
              </Suspense>
            </div>
          </div>

          <hr className="my-10" />

          <Suspense fallback={<ProductListSkeleton title="Related Items" />}>
            <RelatedProducts productId={productId} />
          </Suspense>
        </div>
      </Container>
    </div>
  );
};

export default ProductPage;
