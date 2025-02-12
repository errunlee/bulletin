import { fetch } from "@/lib/fetch";
import { API_KEYS } from "@/services/newsService";
import { useQuery } from "@tanstack/react-query";

interface CategoryResponse {
  response: {
    results: {
      webTitle: string;
    }[];
  };
}

// Only fetch categories from The Guardian as it is not possible to fetch categories from News API and New York Times
export default function useGetCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: () =>
      fetch<CategoryResponse>("https://content.guardianapis.com/sections", {
        "api-key": API_KEYS.GUARDIAN,
      }),
    select: (data) => {
      return data.response.results.map((category) => category.webTitle);
    },
  });
}
