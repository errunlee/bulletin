import { fetchGuardianNews } from "@/lib/fetchGuardianNews";
import { fetchNewsApi } from "@/lib/fetchNewsApi";
import { fetchNyTimes } from "@/lib/fetchNYTimes";
import { NewsArticle } from "@/types/newsArticle";
import { format, subDays } from "date-fns";

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

    // Format the date for each API
    const today = format(new Date(), "yyyy-MM-dd");
    let fromDate: string | undefined;
    if (params?.date) {
      fromDate = format(new Date(params.date as string), "yyyy-MM-dd");
    }
    //  fromDate = params?.date
    //   ? format(new Date(params.date as string), "yyyy-MM-dd")
    //   : format(subDays(new Date(), 7), "yyyy-MM-dd"); // Default: Last 7 days

    // Conditionally fetch NewsAPI (Handles from-to Date)
    if (preferredSources?.includes("News API")) {
      const newsApiParams = {
        ...params,
        from: fromDate, // NewsAPI uses `from`
        to: fromDate ? today : null,
      };
      requests.push(fetchNewsApi("everything", query, newsApiParams));
    }

    // Conditionally fetch NYTimes (Handles Begin Date)
    if (preferredSources?.includes("New York Times")) {
      const nyTimesParams = {
        ...params,
        begin_date: fromDate?.replace(/-/g, ""),
        end_date: fromDate ? today.replace(/-/g, "") : null,
      };
      requests.push(
        fetchNyTimes("search/v2/articlesearch.json", query, nyTimesParams)
      );
    }

    // Conditionally fetch Guardian (Handles from-date)
    if (preferredSources?.includes("The Guardian")) {
      const guardianParams = {
        ...params,
        "from-date": fromDate,
        "to-date": fromDate ? today : null,
      };
      requests.push(fetchGuardianNews("search", query, guardianParams));
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

    // Sort by publication date
    return uniqueResults.sort((a, b) => {
      return fromDate
        ? new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime()
        : new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
    });
  } catch (error) {
    console.error("Error fetching news:", error);
    throw new Error("Failed to fetch news");
  }
};

export { fetchNewsByPreference };
