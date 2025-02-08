import { useGetNewsFromNewsApi } from "@/hooks/useGetNewsFromNewsApi";
import NewsCard from "./newsCard";
import { useGetAllNews } from "@/hooks/useGetAllNews";
import useGetTopNews from "@/hooks/useNews";

const NewsFeed = () => {
  //   const { data } = useGetNewsFromNyTimes();
  const { data } = useGetTopNews();
  // const { data } = useGetAllNews("bitcoin");
  return (
    <section className="flex flex-col justify-start gap-3">
      {data?.map((item) => {
        return <NewsCard key={item.url} article={item} />;
      })}
    </section>
  );
};

export default NewsFeed;
