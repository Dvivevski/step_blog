import { lazy } from "react";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";

export const unProtectedRoutes = [
  // {
  //   path: "/login",
  //   element: <Login />,
  // },
  {
    path: "/admin",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
];
