import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage, { baseApiURL } from "./app/login";
import RegisterPage from "./app/register";
import UserPage from "./app/user";

type UserData = {
  username: string;
  name: string;
  password: string;
  created_at: string;
};

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/user/:username",
    element: <UserPage />,
    loader: async ({ params }) => {
      const res = await fetch(baseApiURL + "/user/" + params.username, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const resData = await res.json();

      return resData;
    },
  },
]);

const el = document.getElementById("root");
if (el) {
  const root = createRoot(el);
  root.render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
} else {
  throw new Error("Could not find root element");
}
