import { NavLink } from "react-router-dom";

import SearchBar from "../search/searchbar";

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
  Technology: "/news/technology",
  Business: "/news/business",
};

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md py-4 sticky top-0 z-50 mb-5 flex justify-between items-start md:items-center flex-col md:flex-row gap-3">
      <ul className="flex flex-wrap gap-6 items-center max-w-6xl  px-4 ">
        {Object.entries(navItems).map(([title, href]) => (
          <li key={title}>
            <LinkTag href={href} title={title} />
          </li>
        ))}
      </ul>

      <div className="px-4">
        <SearchBar />
      </div>
    </nav>
  );
};

export default Navbar;
