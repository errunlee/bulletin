import { fetch } from "@/lib/fetch";
import { GuardianNewsResponse } from "@/types/response/guardiannews";
import { NewsArticle } from "@/types/newsArticle";
import { useQuery } from "@tanstack/react-query";

const url =
  "https://content.guardianapis.com/search?api-key=4400b426-bf41-491d-be01-afd6315a8f18&show-fields=byline,thumbnail,headline";

const fetchNews = async (): Promise<NewsArticle[]> => {
  //Fetch data from api
  const response = await fetch<GuardianNewsResponse>(url);

  //   Match response with  custom news article type
  return response.response.results.map((article) => ({
    source: { name: "The Guardian" },
    author: article.fields?.byline || "Unknown",
    title: article.fields?.headline || "No Title",
    description: "Click to read more",
    url: article.webUrl,
    urlToImage: article.fields?.thumbnail || "https://via.placeholder.com/150",
    publishedAt: article.webPublicationDate,
  }));
};

// Custom React Query hook
export function useGetNewsFromGuardian() {
  return useQuery({
    queryKey: ["guardian_news"],
    queryFn: fetchNews,
  });
}
