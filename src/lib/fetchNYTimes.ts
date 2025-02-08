import { fetch } from "./fetch";
import { ENDPOINTS } from "@/config/endpoints";
import { API_KEYS } from "@/services/newsService";
import { NYTimesResponse } from "@/types/response/newYorkTimes";

export const fetchNyTimes = async (
  url: string,
  query: string | null,
  params?: Record<string, string | number | null | undefined>
) => {
  const response = await fetch<NYTimesResponse>(`${ENDPOINTS.NYTIMES}/${url}`, {
    q: query,
    "api-key": API_KEYS.NYTIMES,
    ...params,
  });
  return response.response.docs.map((article) => ({
    source: { name: article.source || "New York Times" },
    author: article.byline?.original || "Unknown",
    title: article.headline?.main || "No Title",
    description: article.abstract || "Click to read more",
    url: article.web_url,
    urlToImage: article.multimedia?.[0]?.url
      ? `https://www.nytimes.com/${article.multimedia[0].url}`
      : "https://via.placeholder.com/150",
    publishedAt: article.pub_date || new Date().toISOString(),
  }));
};
