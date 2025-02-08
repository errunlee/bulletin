import fetchAllNews from "@/services/newsService";
import { useQuery } from "@tanstack/react-query";

export const useGetAllNews = (search: string | null) => {
  return useQuery({
    queryKey: ["news", search],
    queryFn: () => fetchAllNews(search),
  });
};
