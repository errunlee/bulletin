import { NewsAPIResponse } from "@/types/response/newsapi";
import { fetch } from "./fetch";
import { ENDPOINTS } from "@/config/endpoints";
import { API_KEYS } from "@/services/newsService";
import { NewsArticle } from "@/types/newsArticle";

export const fetchNewsApi = async (
  url: string,
  query: string | null,
  params?: Record<string, string | number | null | undefined>
): Promise<NewsArticle[]> => {
  const response = await fetch<NewsAPIResponse>(
    `${ENDPOINTS.NEWS_API}/${url}`,
    {
      q: query,
      apiKey: API_KEYS.NEWS_API,
      pageSize: 10,
      ...params,
    }
  );
  return response.articles.map((article) => ({
    source: { name: article.source.name || "Unknown" },
    author: article.author || "Unknown",
    title: article.title || "No Title",
    description: article.description || "-",
    url: article.url,
    urlToImage: article.urlToImage,
    publishedAt: article.publishedAt || new Date().toISOString(),
  }));
};
