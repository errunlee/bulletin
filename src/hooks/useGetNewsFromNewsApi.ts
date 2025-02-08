import { fetch } from "@/lib/fetch";
import { NewsArticle } from "@/types/newsArticle";
import { useQuery } from "@tanstack/react-query";
import { NewsAPIResponse } from "@/types/response/newsapi";
import data from "../temp/newsApiDummy.json";
const url =
  "https://newsapi.org/v2/everything?q=bitcoin&apiKey=2fda584a1ecd435ba5698cfcafc219cc";

const fetchNews = async (): Promise<NewsArticle[]> => {
  //Fetch data from api
  //   const response = await fetch<NewsAPIResponse>(url);

  const response = data;
  //   Match response with  custom news article type
  return response.articles.map((article) => ({
    source: { name: article.source.name || "" },
    author: article.author || "Unknown",
    title: article.title || "No Title",
    description: article.description || "-",
    url: article.url,
    urlToImage: article.urlToImage || "https://via.placeholder.com/150",
    publishedAt: article.publishedAt,
  }));
};

// Custom React Query hook
export function useGetNewsFromNewsApi() {
  return useQuery({
    queryKey: ["newsapi_news"],
    queryFn: fetchNews,
  });
}
