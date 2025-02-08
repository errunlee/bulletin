import NewsCard from "@/components/homepage/newsCard";
import { Button } from "@/components/ui/button";
import { useGetAllNews } from "@/hooks/useGetAllNews";
import { CardSkeleton } from "@/skeletons/homepage";
import { LoaderCircle } from "lucide-react";
import { useParams } from "react-router-dom";

const Category = () => {
  const { category } = useParams();

  const {
    data: pages,
    isLoading,
    isError,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useGetAllNews("", undefined, {
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
          {pages?.pages?.map((articles) => {
            return articles.map((article) => (
              <NewsCard key={article.url} article={article} />
            ));
          })}
        </section>
      )}
      <div className="flex justify-center my-4">
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
  );
};

export default Category;
