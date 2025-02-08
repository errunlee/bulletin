import useGetTopPicks from "@/hooks/useGetTopPicks";
import { CardSkeleton } from "@/skeletons/homepage";

const TopPicks = () => {
  const { data, isLoading, isError } = useGetTopPicks();

  if (isError) {
    return <div>Something went wrong</div>;
  }
  return (
    <section className="">
      <div className="container mt-4">
        <h2 className="text-2xl   mb-2 text-blue-500">Popular</h2>
        {isLoading ? (
          <CardSkeleton />
        ) : (
          <ul className="bg-white rounded p-2 space-y-3">
            {data?.map((item) => {
              return (
                <li
                  key={item.url}
                  className="p-2 bg-secondary rounded-lg flex gap-2"
                >
                  <img
                    src={item.urlToImage}
                    alt={item.title}
                    className=" h-10 rounded-lg"
                  />
                  <a
                    href={item.url}
                    target="_blank"
                    className="flex gap-4 px-1 py-2 items-center  hover:text-blue-400 "
                  >
                    <span>
                      {item.description.length > 100
                        ? item.description.slice(0, 100) + "..."
                        : item.description}
                    </span>
                  </a>
                </li>
              );
            })}
            {data?.length == 0 && <p>Nothing found</p>}
          </ul>
        )}
      </div>
    </section>
  );
};

export default TopPicks;
