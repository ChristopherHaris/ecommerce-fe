import getProducts from "@/actions/get-products";
import ProductCard from "@/components/ui/product-card";
import NoResults from "@/components/ui/no-results";

interface CategoryProductsProps {
  categoryId: string;
  colorId?: string;
  sizeId?: string;
}

const CategoryProducts = async ({
  categoryId,
  colorId,
  sizeId,
}: CategoryProductsProps) => {
  // Fetch products based on filters
  const products = await getProducts({
    categoryId,
    colorId,
    sizeId,
  });

  if (products.length === 0) {
    return <NoResults />;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {products.map((item) => (
        <ProductCard key={item.id} data={item} />
      ))}
    </div>
  );
};

export default CategoryProducts;
