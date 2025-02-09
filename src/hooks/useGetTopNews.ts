import { fetchGuardianNews } from "@/lib/fetchGuardianNews";
import { fetchNewsApi } from "@/lib/fetchNewsApi";
import { fetchNyTimes } from "@/lib/fetchNYTimes";
import { NewsArticle } from "@/types/newsArticle";
import { useInfiniteQuery } from "@tanstack/react-query";

const fetchNews = async (pageParam: number) => {
  const requests: Promise<NewsArticle[]>[] = [
    fetchNewsApi("top-headlines", null, { country: "us", page: pageParam }),
    fetchGuardianNews("search", null, { page: pageParam }),
    fetchNyTimes("search/v2/articlesearch.json", null, { page: pageParam }),
  ];
  const results = await Promise.allSettled(requests);
  const succedResults = results.filter(
    (result) => result.status === "fulfilled"
  );

  return succedResults
    .flatMap((result) => result.value)
    .sort((a, b) => (a.publishedAt > b.publishedAt ? -1 : 1));
};

export default function useGetTopNews() {
  return useInfiniteQuery({
    queryKey: ["news", "top-headlines"],
    queryFn: ({ pageParam = 1 }) => fetchNews(pageParam),
    initialPageParam: 1,
    getNextPageParam: (_, pages) => pages.length + 1,
  });
}
