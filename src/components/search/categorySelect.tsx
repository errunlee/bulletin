import { SelectElement } from "../ui/select";

const categories = [
  { value: "business", label: "Business" },
  { value: "entertainment", label: "Entertainment" },
  { value: "technology", label: "Technology" },
  { value: "sports", label: "Sports" },
  { value: "science", label: "Science" },
];

type CategoryProps = {
  handleCategoryChange: (value: string) => void;
  category?: string;
};

const CategorySelect = ({ handleCategoryChange, category }: CategoryProps) => {
  return (
    <SelectElement
      handleChange={handleCategoryChange}
      data={categories}
      label="Select a category"
      value={category || ""}
      placeholder={!category ? "All categories" : ""}
    />
  );
};

export default CategorySelect;
