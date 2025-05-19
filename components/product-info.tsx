import getProduct from "@/actions/get-product";
import Info from "@/components/info";

interface ProductInfoProps {
  productId: string;
}

const ProductInfo = async ({ productId }: ProductInfoProps) => {
  const product = await getProduct(productId);
  return <Info data={product} />;
};

export default ProductInfo;