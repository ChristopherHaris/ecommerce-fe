import getProduct from "@/actions/get-product";
import getProducts from "@/actions/get-products";
import ProductList from "@/components/product-list";

interface RelatedProductsProps {
  productId: string;
}

const RelatedProducts = async ({ productId }: RelatedProductsProps) => {
  const product = await getProduct(productId);
  const suggestedProducts = await getProducts({
    categoryId: product?.categories?.id,
  });

  return <ProductList title="Related Items" items={suggestedProducts} />;
};

export default RelatedProducts;
