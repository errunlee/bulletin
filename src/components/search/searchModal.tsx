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
import { ChevronDown, Search } from "lucide-react";
import { useRef, useState } from "react";
import FilterBar from "./filterBar";
import { format } from "date-fns";
import { Input } from "../ui/input";
import { useNavigate } from "react-router-dom";

export default function SearchModal({
  isModalOpen,
  setIsModalOpen,
}: {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [category, setCategory] = useState("");
  const [source, setSource] = useState("");
  const [date, setDate] = useState<Date>();
  const [error, setError] = useState(false);
  const queryRef = useRef<HTMLInputElement>(null);

  const handleCategoryChange = (v: string) => {
    setCategory(v);
  };

  const handleSourceChange = (v: string) => {
    setSource(v);
  };

  const handleDateChange = (date: Date | undefined) => {
    setDate(date);
  };

  const nav = useNavigate();
  const handleSearch = () => {
    setError(false);
    const url = new URL(`${window.location.origin}/news/search`);

    const query = queryRef?.current?.value;
    if (query?.trim() && query.length > 3) {
      url.searchParams.set("q", query);
    } else {
      setError(true);
      setIsModalOpen(true);
      return;
    }
    if (category) {
      url.searchParams.set("category", category);
    }
    if (source) {
      url.searchParams.set("source", source);
    }

    if (date) {
      url.searchParams.set("date", format(date, "yyyy-MM-dd"));
    }
    setIsModalOpen(false);
    nav(`${url.pathname}${url.search}`);
  };

  return (
    <>
      <AlertDialog open={isModalOpen}>
        <AlertDialogTrigger asChild>
          <Button onClick={() => setIsModalOpen(true)} variant="ghost">
            <ChevronDown />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="md:max-w-fit">
          <AlertDialogHeader>
            <AlertDialogTitle>Search news across the web</AlertDialogTitle>
            <AlertDialogDescription className="flex flex-col gap-3">
              <FilterBar
                handleCategoryChange={handleCategoryChange}
                handleDateChange={handleDateChange}
                handleSourceChange={handleSourceChange}
                category={category}
                date={date}
                source={source}
              />

              <div className="relative">
                <Input
                  ref={queryRef}
                  name="search"
                  defaultValue={queryRef?.current?.value}
                  type="search"
                  className="pl-8 "
                  placeholder="Search news..."
                />

                <Search className="w-4 h-4 absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
              </div>
              {error && (
                <p className="text-destructive">Invalid search keywords</p>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsModalOpen(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleSearch}>Search</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
