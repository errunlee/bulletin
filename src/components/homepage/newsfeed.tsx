import { CardSkeleton } from "@/skeletons/homepage";
import NewsCard from "./newsCard";
import useGetTopNews from "@/hooks/useGetTopNews";
import { Button } from "../ui/button";
import { LoaderCircle } from "lucide-react";

const NewsFeed = () => {
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useGetTopNews();

  if (isLoading) {
    return <CardSkeleton />;
  }

  if (isError) {
    <p>Something went wrong</p>;
  }

  return (
    <section className="flex flex-col justify-start gap-3 mb-6">
      {data?.pages.map((articles) => (
        <>
          {articles.map((article) => (
            <NewsCard key={article.url} article={article} />
          ))}
        </>
      ))}

      <div className="flex justify-center">
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
    </section>
  );
};

export default NewsFeed;
