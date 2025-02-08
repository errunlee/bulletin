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

export default function SearchModal() {
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
    if (query?.trim() && query.length > 2) {
      url.searchParams.set("q", query);
    } else {
      setError(true);
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
    nav(`${url.pathname}${url.search}`);
  };

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="ghost">
            <ChevronDown />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="max-w-fit">
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
                <p className="text-destructive">Enter at least 2 characters</p>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleSearch}>Search</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
