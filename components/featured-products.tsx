import getProducts from "@/actions/get-products";
import ProductList from "@/components/product-list";

const FeaturedProducts = async () => {
  const products = await getProducts({ isFeatured: true });

  return <ProductList title="Featured Products" items={products} />;
};

export default FeaturedProducts;
