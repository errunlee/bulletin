import Header from "@/components/layout/header";
import Navbar from "@/components/layout/navbar";
import { Outlet } from "react-router-dom";

type Props = {};

const Layout = ({}: Props) => {
  return (
    <main className="bg-secondary font-poppins">
      <header className="px-5 md:px-10 lg:px-20 bg-gray-50">
        <Header />
      </header>
      <Navbar />
      <section className="px-5 md:px-10 lg:px-20">
        <Outlet />
      </section>
    </main>
  );
};

export default Layout;
