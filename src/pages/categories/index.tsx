import NewsCard from "@/components/homepage/newsCard";
import { useGetAllNews } from "@/hooks/useGetAllNews";
import { useParams } from "react-router-dom";

const Category = () => {
  const { category } = useParams();

  const { data } = useGetAllNews("", undefined, {
    category: category || "",
  });

  return (
    <div>
      <p className=" text-lg my-2">Top results for {category}</p>
      <section className="flex flex-col gap-3">
        {data?.map((item) => {
          return <NewsCard key={item.url} article={item} />;
        })}
      </section>
    </div>
  );
};

export default Category;
