import { useUrlParams } from "@/hooks/useUrlParams";
import { Search } from "lucide-react";
import { useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Input } from "../ui/input";
import SearchModal from "./searchModal";

const SearchBar = () => {
  const formRef = useRef<HTMLFormElement>(null);

  const nav = useNavigate();

  const location = useLocation();

  const { getParam } = useUrlParams();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get("search")?.toString() || "";
    if (query.trim()) {
      nav(`/news/search?q=${encodeURIComponent(query)}`);
    }
  };

  useEffect(() => {
    formRef.current?.reset();
  }, [location.search]);

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="relative">
      <Input
        name="search"
        defaultValue={getParam("q")}
        className="pl-8"
        placeholder="Search news..."
      />
      <Search className="w-4 h-4 absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
      {location.pathname !== "/news/search" && (
        <div className="absolute right-2 top-1/2 -translate-y-1/2">
          <SearchModal />
        </div>
      )}
    </form>
  );
};

export default SearchBar;
