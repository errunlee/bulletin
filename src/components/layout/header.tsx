const Header = () => {
  return (
    <div className="bg-gray-50 p-5">
      <div>
        <h1 className="text-6xl text-center">The Bulletin</h1>
        <h2 className="text-center font-bold">Stay Informed, Stay Ahead</h2>
      </div>
      <div className="flex">
        <p className="text-md md:text-xl">{new Date().toUTCString()}</p>
      </div>
    </div>
  );
};

export default Header;
