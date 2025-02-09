import { fetchGuardianNews } from "@/lib/fetchGuardianNews";
import { fetchNyTimes } from "@/lib/fetchNYTimes";
import { NewsArticle } from "@/types/newsArticle";
import { useQuery } from "@tanstack/react-query";

//Get top news articles from The Guardian and New York Times only because News API does not provide a way to fetch top news articles
const fetchNews = async () => {
  const requests: Promise<NewsArticle[]>[] = [
    fetchGuardianNews("search", null, {
      "order-by": "relevance",
      "page-size": 25,
    }),
    fetchNyTimes("mostpopular/v2/viewed/7.json", null),
  ];
  const results = await Promise.allSettled(requests);
  const succedResults = results.filter(
    (result) => result.status === "fulfilled"
  );
  return succedResults.flatMap((result) => result.value);
};

export default function useGetTopPicks() {
  return useQuery({
    queryKey: ["news", "top-picks"],
    queryFn: fetchNews,
  });
}
