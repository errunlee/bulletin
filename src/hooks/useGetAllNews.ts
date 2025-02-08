import { fetchNewsByPreference } from "@/services/newsService";
import { useQuery } from "@tanstack/react-query";

export const useGetAllNews = (
  search: string | null,
  preferredSource?: string | null,
  query?: Record<string, string | null>
) => {
  const sources: string[] = [];
  if (preferredSource) {
    sources.push(preferredSource);
  }
  return useQuery({
    queryKey: ["news", search, query, preferredSource],
    queryFn: () =>
      fetchNewsByPreference(
        search,
        preferredSource ? sources : undefined,
        query
      ),
  });
};
