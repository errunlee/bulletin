import { fetchGuardianNews } from "@/lib/fetchGuardianNews";
import { fetchNewsApi } from "@/lib/fetchNewsApi";
import { fetchNyTimes } from "@/lib/fetchNYTimes";
import { NewsArticle } from "@/types/newsArticle";
import { useQuery } from "@tanstack/react-query";

const fetchNews = async () => {
  const requests: Promise<NewsArticle[]>[] = [
    fetchNewsApi("top-headlines", null, { country: "us" }),
    fetchGuardianNews("search", null),
    fetchNyTimes("topstories/v2/home.json", null),
  ];
  const results = await Promise.allSettled(requests);
  const succedResults = results.filter(
    (result) => result.status === "fulfilled"
  );
  return succedResults.flatMap((result) => result.value);
};

export default function useGetTopNews() {
  return useQuery({
    queryKey: ["news", "top-headlines"],
    queryFn: fetchNews,
  });
}
