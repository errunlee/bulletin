import { fetch } from "@/lib/fetch";
import { NewsArticle } from "@/types/newsArticle";
import { useQuery } from "@tanstack/react-query";
import data from "../temp/newYorkTimesDummy.json";
const url =
  "https://api.nytimes.com/svc/archive/v1/2024/1.json?api-key=Arqc2pisGkdRKTpKOd4VRDRbVmHekRrp";

const fetchNews = async (): Promise<NewsArticle[]> => {
  //Fetch data from api
  //   const response = await fetch(url);
  const response = data;
  debugger;
  //   Match response with  custom news article type
  return response.response.docs.map((article) => ({
    source: { name: article?.source },
    author: article.byline?.original || "Unknown",
    title: article?.headline?.main || "No Title",
    description: article.lead_paragraph,
    url: article?.web_url,
    urlToImage:
      `https://www.nytimes.com/${article.multimedia[0].url}` ||
      "https://via.placeholder.com/150",
    publishedAt: article?.pub_date || "N/A",
  }));
};

// Custom React Query hook
export function useGetNewsFromNyTimes() {
  return useQuery({
    queryKey: ["guardian_news"],
    queryFn: fetchNews,
  });
}
