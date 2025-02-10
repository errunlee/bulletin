import { fetchNewsByPreference } from "@/services/newsService";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useGetAllNews = (
  search: string | null,
  preferredSource?: string | null,
  query?: Record<string, string | null>
) => {
  const sources: string[] = [];
  if (preferredSource) {
    sources.push(preferredSource);
  }
  return useInfiniteQuery({
    queryKey: ["news", search, query, preferredSource],
    queryFn: ({ pageParam = 1 }) =>
      fetchNewsByPreference(
        search ? search : null,
        preferredSource ? sources : undefined,
        {
          ...query,
          page: pageParam,
        }
      ),
    initialPageParam: 1,
    getNextPageParam: (_, pages) => pages.length + 1,
  });
};
