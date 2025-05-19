import getCategory from "@/actions/get-category";
import Billboard from "@/components/billboard";

interface CategoryBillboardProps {
  categoryId: string;
}

const CategoryBillboard = async ({ categoryId }: CategoryBillboardProps) => {
  const category = await getCategory(categoryId);

  if (!category.isBillboard || !category.billboards) {
    return null;
  }

  return <Billboard data={category.billboards} />;
};

export default CategoryBillboard;
