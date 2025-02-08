import NewsCard from "@/components/homepage/newsCard";
import { useGetAllNews } from "@/hooks/useGetAllNews";
import { CardSkeleton } from "@/skeletons/homepage";
import { useParams } from "react-router-dom";

const Category = () => {
  const { category } = useParams();

  const { data, isLoading, isError } = useGetAllNews("", undefined, {
    category: category || "",
  });

  if (isError) {
    return <div>Something went wrong</div>;
  }

  return (
    <div>
      <p className=" text-lg my-2">Top results for {category}</p>
      {isLoading ? (
        <CardSkeleton />
      ) : (
        <section className="flex flex-col gap-3">
          {data?.map((item) => {
            return <NewsCard key={item.url} article={item} />;
          })}
        </section>
      )}
    </div>
  );
};

export default Category;
