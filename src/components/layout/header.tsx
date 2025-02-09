import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="bg-gray-50 p-5 ps-0">
      <div className="flex justify-center items-center gap-5">
        <img
          alt="logo"
          className="w-16 h-16 md:w-24 md:h-24 rounded-full"
          src="/logo.png"
        />
        <Link to="/">
          <h1 className="text-3xl sm:text-4xl md:text-6xl text-center">
            The Bulletin
          </h1>
          <h2 className="text-center font-bold">Stay Informed, Stay Ahead</h2>
        </Link>
      </div>
      <div className="flex">
        <p className="text-md md:text-xl">
          {new Date().toUTCString().slice(0, 16)}
        </p>
      </div>
    </div>
  );
};

export default Header;
