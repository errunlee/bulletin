import { CardSkeleton } from "@/skeletons/homepage";
import NewsCard from "./newsCard";
import useGetTopNews from "@/hooks/useGetTopNews";

const NewsFeed = () => {
  const { data, isLoading, isError } = useGetTopNews();

  if (isLoading) {
    return <CardSkeleton />;
  }

  if (isError) {
    <p>Failed to get news.</p>;
  }

  return (
    <section className="flex flex-col justify-start gap-3">
      {data?.map((item) => {
        return <NewsCard key={item.url} article={item} />;
      })}
    </section>
  );
};

export default NewsFeed;
