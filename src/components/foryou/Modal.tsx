import { useState, useEffect } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import useGetCategories from "@/hooks/useGetCategories";

const availableSources = ["New York Times", "News API", "The Guardian"];

const availableAuthors = [
  "John Doe",
  "Jane Smith",
  "Alex Johnson",
  "Emily Davis",
];

interface Preferences {
  sources: string[];
  categories: string[];
  authors: string[];
}

const PreferencesDialog = ({
  savePreferences,
}: {
  savePreferences: (prefs: Preferences) => void;
}) => {
  const [preferences, setPreferences] = useState<Preferences>({
    sources: [],
    categories: [],
    authors: [],
  });

  // Load existing preferences from localStorage
  useEffect(() => {
    const storedPrefs = JSON.parse(localStorage.getItem("preferences") || "{}");
    if (Object.keys(storedPrefs).length > 0) {
      setPreferences(storedPrefs);
    }
  }, []);

  // Toggle preference selection
  const togglePreference = (type: keyof Preferences, value: string) => {
    setPreferences((prev) => ({
      ...prev,
      [type]: prev[type].includes(value)
        ? prev[type].filter((item) => item !== value)
        : [...prev[type], value],
    }));
  };

  const { data: availableCategories } = useGetCategories();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <div className="flex justify-end">
          <Button variant="outline" className="">
            Set Preferences
          </Button>
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-[80%]">
        <AlertDialogHeader>
          <AlertDialogTitle>Select and Set Your Preferences</AlertDialogTitle>
          <AlertDialogDescription>
            Choose your preferred news sources, categories, and authors.
          </AlertDialogDescription>
        </AlertDialogHeader>

        {/* Select News Sources */}
        <div className="mb-4">
          <h4 className="font-semibold mb-2">Preferred News Sources</h4>
          <div className="flex flex-wrap gap-2">
            {availableSources.map((source) => (
              <Button
                key={source}
                variant={
                  preferences.sources.includes(source) ? "default" : "outline"
                }
                className={`rounded-full px-4 py-2 transition ${
                  preferences.sources.includes(source)
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                }`}
                onClick={() => togglePreference("sources", source)}
              >
                {source}
              </Button>
            ))}
          </div>
        </div>

        {/* Select Categories */}
        <div className="mb-4">
          <h4 className="font-semibold mb-2">Preferred Categories</h4>
          <div className="flex flex-wrap gap-2">
            {availableCategories?.slice(0, 20).map((category) => (
              <Button
                key={category}
                variant={
                  preferences.categories.includes(category)
                    ? "default"
                    : "outline"
                }
                className={`rounded-full px-4 py-2 transition ${
                  preferences.categories.includes(category)
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                }`}
                onClick={() => togglePreference("categories", category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Select Authors */}
        <div className="mb-4">
          <h4 className="font-semibold mb-2">Preferred Authors</h4>
          <div className="flex flex-wrap gap-2">
            {availableAuthors.map((author) => (
              <Button
                key={author}
                variant={
                  preferences.authors.includes(author) ? "default" : "outline"
                }
                className={`rounded-full px-4 py-2 transition ${
                  preferences.authors.includes(author)
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                }`}
                onClick={() => togglePreference("authors", author)}
              >
                {author}
              </Button>
            ))}
          </div>
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              localStorage.setItem("preferences", JSON.stringify(preferences));
              savePreferences(preferences);
            }}
          >
            Save Preferences
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default PreferencesDialog;
