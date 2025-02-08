import { fetchGuardianNews } from "@/lib/fetchGuardianNews";
import { fetchNewsApi } from "@/lib/fetchNewsApi";
import { fetchNyTimes } from "@/lib/fetchNYTimes";
import { NewsArticle } from "@/types/newsArticle";

export const API_KEYS = {
  NEWS_API: import.meta.env.VITE_NEWSAPI_APIKEY,
  NYTIMES: import.meta.env.VITE_NYTIMES_APIKEY,
  GUARDIAN: import.meta.env.VITE_GUARDIAN_APIKEY,
};

const fetchNewsByPreference = async (
  query: string | null,
  preferredSources: string[] | undefined = [
    "News API",
    "New York Times",
    "The Guardian",
  ],
  params?: Record<string, string | number | null>
): Promise<NewsArticle[]> => {
  try {
    const requests: Promise<NewsArticle[]>[] = [];
    // Conditionally fetch NewsAPI
    if (preferredSources?.includes("News API")) {
      requests.push(fetchNewsApi("everything", query, params));
    }

    // Conditionally fetch NYTimes
    if (preferredSources?.includes("New York Times")) {
      requests.push(
        fetchNyTimes("search/v2/articlesearch.json", query, params)
      );
    }

    // Conditionally fetch Guardian
    if (preferredSources?.includes("The Guardian")) {
      requests.push(fetchGuardianNews("search", query, params));
    }

    // Fetch only selected sources
    const results = await Promise.allSettled(requests);
    const successfulResults = results
      .filter((result) => result.status === "fulfilled")
      .map((result) => result.value);

    const mergedResults = successfulResults.flat(); // Flatten array

    // Remove duplicate articles based on URL
    const uniqueResults = Array.from(
      new Map(mergedResults.map((article) => [article.url, article])).values()
    );

    // Sort by publication date (most recent first)
    return uniqueResults.sort(
      (a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt)
    );
  } catch (error) {
    console.error("Error fetching news:", error);
    throw new Error("Failed to fetch news");
  }
};

export { fetchNewsByPreference };
