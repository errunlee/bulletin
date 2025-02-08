import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchNewsByPreference } from "@/services/newsService";
import PreferencesDialog from "./Modal";
import NewsCard from "../homepage/newsCard";

const Preferences = () => {
  const [preferences, setPreferences] = useState<{
    sources: string[];
    categories: string[];
    authors: string[];
  }>({
    sources: [],
    categories: [],
    authors: [],
  });

  // Load preferences from localStorage
  useEffect(() => {
    const storedPreferences = JSON.parse(
      localStorage.getItem("preferences") || "{}"
    );
    if (Object.keys(storedPreferences).length > 0) {
      setPreferences(storedPreferences);
    }
  }, []);

  // Construct search query based on preferences
  const query = [...preferences.categories, ...preferences.authors].join(
    " OR "
  );

  // Fetch news for selected preferences
  const { data: articles, isLoading } = useQuery({
    queryKey: ["forYouNews", preferences],
    queryFn: () => fetchNewsByPreference(query, preferences.sources),
    enabled: query.length > 0 || preferences.sources.length > 0,
  });
  return (
    <div className="p-6">
      <PreferencesDialog savePreferences={setPreferences} />

      <h2 className="text-2xl font-bold mb-4">Based on your preferences</h2>

      {preferences.sources.length === 0 &&
        preferences.categories.length === 0 &&
        preferences.authors.length === 0 && (
          <p>
            Select your favorite sources, categories, and authors using the
            preferences button above to get customized news updates.
          </p>
        )}

      {isLoading && <p>Loading articles...</p>}

      <div className="flex flex-col gap-4 mt-3">
        {!isLoading && articles && articles?.length > 0
          ? articles.map((article, index) => (
              <NewsCard article={article} key={index} />
            ))
          : query.length > 0 && <p>No articles found for your preferences.</p>}
      </div>
    </div>
  );
};

export default Preferences;
