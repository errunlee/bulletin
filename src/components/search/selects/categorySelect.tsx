import { SelectElement } from "@/components/ui/select";
import useGetCategories from "@/hooks/useGetCategories";

type CategoryProps = {
  handleCategoryChange: (value: string) => void;
  category?: string;
};

const CategorySelect = ({ handleCategoryChange, category }: CategoryProps) => {
  const { data: categories } = useGetCategories();
  return (
    <SelectElement
      handleChange={handleCategoryChange}
      data={
        categories?.map((category) => {
          return { label: category, value: category };
        }) || []
      }
      label="Select a category"
      value={category || ""}
      placeholder={!category ? "All categories" : ""}
    />
  );
};

export default CategorySelect;
