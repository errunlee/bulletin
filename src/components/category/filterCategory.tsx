import { useUrlParams } from "@/hooks/useUrlParams";
import { useState } from "react";
import { format } from "date-fns";

import FilterBar from "../search/filterBar";

const FilterCategory = () => {
  const { getParam, setParam } = useUrlParams();

  const [category, setCategory] = useState(getParam("category"));
  const [source, setSource] = useState(getParam("source"));
  const [date, setDate] = useState<Date | undefined>(
    getParam("date") ? new Date(getParam("date")) : undefined
  );

  const handleCategoryChange = (value: string) => {
    setParam("category", value);
    setCategory(value);
  };

  const handleSourceChange = (value: string) => {
    setParam("source", value);
    setSource(value);
  };

  const handleDateChange = (value: Date | undefined) => {
    if (value) {
      setParam("date", format(value, "yyyy-MM-dd"));
      setDate(value);
    }
  };

  return (
    <div className="flex gap-4">
      {/* <CategorySelect
        handleCategoryChange={handleCategoryChange}
        category={category}
      />
      <SourceSelect handleSourceChange={handleSourceChange} source={source} />

      <DateSelect handleDateChange={handleDateChange} date={date} /> */}
      <FilterBar
        handleCategoryChange={handleCategoryChange}
        handleDateChange={handleDateChange}
        handleSourceChange={handleSourceChange}
        category={category}
        date={date}
        source={source}
      />
    </div>
  );
};

export default FilterCategory;
