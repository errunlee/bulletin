import NewsCard from "@/components/homepage/newsCard";
import { useGetAllNews } from "@/hooks/useGetAllNews";
import { useSearchParams } from "react-router-dom";
import { useGetNewsFromNewsApi } from "@/hooks/useGetNewsFromNewsApi";
import FilterCategory from "@/components/category/filterCategory";
const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");

  // const { data } = useGetAllNews(query);
  const { data } = useGetNewsFromNewsApi();
  return (
    <section>
      <h1>Search results for: {query}</h1>
      <FilterCategory />
      <div className="space-y-4 mt-4">
        {data?.map((article) => (
          <NewsCard article={article} key={article.url} />
        ))}
      </div>
    </section>
  );
};

export default Search;
