import { createBrowserRouter, redirect } from "react-router-dom";
import Home from "../views/HomePage";
import BaseLayout from "../views/BaseLayout";
import DetailPage from "../views/DetailPage";

const router = createBrowserRouter([
  {
    element: <BaseLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/detail/:id",
        element: <DetailPage />,
      },
    ],
  },
]);

export default router;
