import CategorySelect from "./categorySelect";
import DateSelect from "./dateSelect";
import SourceSelect from "./sourceSelect";

type Props = {
  handleCategoryChange: (value: string) => void;
  handleSourceChange: (value: string) => void;
  handleDateChange: (date: Date | undefined) => void;
  category?: string;
  source?: string;
  date?: Date;
};

const FilterBar = ({
  handleCategoryChange,
  handleDateChange,
  handleSourceChange,
  category,
  date,
  source,
}: Props) => {
  return (
    <div className="flex flex-col gap-3 md:flex-row">
      <CategorySelect
        handleCategoryChange={handleCategoryChange}
        category={category}
      />
      <SourceSelect handleSourceChange={handleSourceChange} source={source} />
      <DateSelect handleDateChange={handleDateChange} date={date} />
    </div>
  );
};
export default FilterBar;
