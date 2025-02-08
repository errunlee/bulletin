import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Input } from "../ui/input";
import { ChevronDown, Search } from "lucide-react";
import { useEffect, useRef } from "react";
import { useUrlParams } from "@/hooks/useUrlParams";
import { Button } from "../ui/button";
import SearchModal from "../search/searchModal";

interface LinkTagProps {
  href: string;
  title: string;
}

const LinkTag = ({ href, title }: LinkTagProps) => {
  return (
    <NavLink
      to={href}
      className={({ isActive }) =>
        `text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium  ${
          isActive && "text-blue-500 border-b-2 border-blue-500"
        }`
      }
    >
      {title}
    </NavLink>
  );
};

const navItems = {
  "Trending News": "/",
  "For You": "/for-you",
  Politics: "/news/politics",
  Crypto: "/news/crypto",
  Technology: "/news/technology",
  Business: "/news/business",
};

const Navbar = () => {
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
    <nav className="bg-white shadow-md py-4 sticky top-0 z-50 mb-5 flex justify-between items-center">
      <ul className="flex gap-6 items-center max-w-6xl  px-4">
        {Object.entries(navItems).map(([title, href]) => (
          <li key={title}>
            <LinkTag href={href} title={title} />
          </li>
        ))}
      </ul>

      <div className="px-4">
        <form ref={formRef} onSubmit={handleSubmit} className="relative">
          <Input
            name="search"
            defaultValue={getParam("q")}
            type="search"
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
      </div>
    </nav>
  );
};

export default Navbar;
