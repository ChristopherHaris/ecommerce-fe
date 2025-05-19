import getSizes from "@/actions/get-sizes";
import getColors from "@/actions/get-colors";
import Filter from "./filter";

const CategoryFilters = async () => {
  // Fetch filter data
  const sizes = await getSizes();
  const colors = await getColors();

  return (
    <>
      <Filter valueKey="sizeId" name="Sizes" data={sizes} />
      <Filter valueKey="colorId" name="Colors" data={colors} />
    </>
  );
};

export default CategoryFilters;
