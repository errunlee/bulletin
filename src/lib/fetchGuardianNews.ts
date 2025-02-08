import { fetch } from "./fetch";
import { ENDPOINTS } from "@/config/endpoints";
import { API_KEYS } from "@/services/newsService";
import { GuardianNewsResponse } from "@/types/response/guardiannews";

export const fetchGuardianNews = async (
  url: string,
  query: string | null,
  params?: Record<string, string | number | null>
) => {
  const response = await fetch<GuardianNewsResponse>(
    `${ENDPOINTS.GUARDIAN}/${url}`,
    {
      q: query,
      "api-key": API_KEYS.GUARDIAN,
      "show-fields": "thumbnail,headline,trailText",
      ...params,
    }
  );
  return response.response.results.map((article) => ({
    source: { name: "The Guardian" },
    author: article.fields?.byline || "Unknown",
    title: article.fields?.headline,
    description: article.fields?.trailText,
    url: article.webUrl,
    urlToImage: article.fields?.thumbnail || "https://via.placeholder.com/150",
    publishedAt: article.webPublicationDate || new Date().toISOString(),
  }));
};
