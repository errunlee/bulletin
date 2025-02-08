import NewsCard from "@/components/homepage/newsCard";
import { useGetAllNews } from "@/hooks/useGetAllNews";

import FilterBar from "@/components/search/filterBar";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");

  const [category, setCategory] = useState(searchParams.get("category"));
  const [source, setSource] = useState(searchParams.get("source"));
  const [date, setDate] = useState<Date>();

  const handleCategoryChange = (v: string) => {
    setCategory(v);
  };

  const handleSourceChange = (v: string) => {
    setSource(v);
  };

  const handleDateChange = (date: Date | undefined) => {
    setDate(date);
  };

  const { data } = useGetAllNews(query, source, {
    category,
    date: date ? date?.toString() : null,
  });
  return (
    <section>
      <h1>Search results for: {query}</h1>
      <FilterBar
        handleCategoryChange={handleCategoryChange}
        handleDateChange={handleDateChange}
        handleSourceChange={handleSourceChange}
        category={category || ""}
        date={date}
        source={source ?? undefined}
      />
      <div className="space-y-4 mt-4">
        {data?.map((article) => (
          <NewsCard article={article} key={article.url} />
        ))}
      </div>
    </section>
  );
};

export default Search;
