import Header from "@/components/layout/header";
import Navbar from "@/components/layout/navbar";
import { Outlet } from "react-router-dom";

type Props = {};

const Layout = ({}: Props) => {
  return (
    <div className="bg-secondary font-poppins">
      <div className="px-5 md:px-10 lg:px-20  bg-gray-50">
        <Header />
        <Navbar />
      </div>
      <div className="px-5 md:px-10 lg:px-20">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
