import getProduct from "@/actions/get-product";
import Gallery from "@/components/gallery/gallery";

interface ProductGalleryProps {
  productId: string;
}

const ProductGallery = async ({ productId }: ProductGalleryProps) => {
  const product = await getProduct(productId);
  return <Gallery images={product.images} />;
};

export default ProductGallery;
