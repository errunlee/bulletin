import NewsCard from "@/components/homepage/newsCard";
import { useGetAllNews } from "@/hooks/useGetAllNews";

import FilterBar from "@/components/search/filterBar";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import { CardSkeleton } from "@/skeletons/homepage";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import { format } from "date-fns";
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
    if (date) setDate(format(date, "yyyy-MM-dd") as unknown as Date);
  };

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetAllNews(query, source, {
    category,
    date: date ? date?.toString() : null,
  });

  if (isError) {
    console.log("error");
    return <div>Something went wrong</div>;
  }
  debugger;
  return (
    <section className="mb-4">
      <h1>Search results for: {query}</h1>
      <FilterBar
        handleCategoryChange={handleCategoryChange}
        handleDateChange={handleDateChange}
        handleSourceChange={handleSourceChange}
        category={category || ""}
        date={date}
        source={source ?? undefined}
      />
      {isLoading ? (
        <CardSkeleton />
      ) : data?.pages[0]?.length === 0 ? (
        <p>No results found.</p>
      ) : (
        <div className="space-y-4 mt-4">
          {data?.pages.map((articles) => (
            <>
              {articles.map((article) => (
                <NewsCard key={article.url} article={article} />
              ))}
            </>
          ))}
          <div className="flex justify-center min-w-16 ">
            <Button
              onClick={() => fetchNextPage()}
              disabled={!hasNextPage || isFetchingNextPage}
            >
              {isFetchingNextPage ? (
                <LoaderCircle className="animate-spin" />
              ) : hasNextPage ? (
                "Load More"
              ) : (
                "Nothing more to load"
              )}
            </Button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Search;
