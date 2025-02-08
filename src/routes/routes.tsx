import TopPicks from "@/components/homepage/toppicks";
import Layout from "@/layout";
import Category from "@/pages/categories";
import ForYou from "@/pages/foryou";
import Homepage from "@/pages/homepage";
import Search from "@/pages/search";
import { createBrowserRouter, Outlet } from "react-router-dom";
// import Home from '../pages/Home';
// import NotFound from '../pages/NotFound';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Homepage />,
      },
      {
        path: "for-you",
        element: <ForYou />,
      },
      {
        path: "news",
        element: (
          <div className="flex">
            <Outlet />
          </div>
        ),
        children: [
          {
            path: "search",
            element: <Search />,
          },
          {
            path: ":category",
            element: <Category />,
          },
        ],
      },
    ],
  },
]);

export default router;
