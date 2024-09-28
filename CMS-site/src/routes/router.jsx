import { createBrowserRouter, redirect } from "react-router-dom";
import BaseLayout from "../views/BaseLayout";
import AdminPage from "../views/AdminPage";
import Login from "../views/LoginPage";
import Categories from "../views/Categories";
import AddUser from "../views/AddUser";
import AddPage from "../views/AddPage";
import Toastify from "toastify-js";
import EditPage from "../views/EditPage";
import PatchImg from "../views/PatchImg";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
    loader: () => {
      if (localStorage.access_token) {
        Toastify({
          text: "Already logged in",
          duration: 3000,
          newWindow: true,
          close: true,
          gravity: "bottom", // `top` or `bottom`
          position: "right", // `left`, `center` or `right`
          stopOnFocus: true, // Prevents dismissing of toast on hover
          style: {
            background: "#FF0000",
          },
          onClick: function () {}, // Callback after click
        }).showToast();
        return redirect("/");
      }

      return null;
    },
  },
  {
    element: <BaseLayout />,
    loader: () => {
      if (!localStorage.access_token) {
        return redirect("/login");
      }

      return null;
    },
    children: [
      {
        path: "/",
        element: <AdminPage />,
      },
      {
        path: "/categories",
        element: <Categories />,
      },
      {
        path: "/add-user",
        element: <AddUser />,
      },
      {
        path: "/add-post",
        element: <AddPage />,
      },
      {
        path: "/edit/:id",
        element: <EditPage />,
      },
      {
        path: "/patch/:id",
        element: <PatchImg />,
      },
    ],
  },
]);

export default router;
