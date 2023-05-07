import { lazy } from "react";

import Users from "../components/users/Users";
import Dashboard from "../components/dashboard/Dashboard";
import BlogForm from "../components/blogs/BlogForm";

export const protectedRoutes = [
  {
    path: "/admin/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/admin/blog/new",
    element: <BlogForm isEdit={false} isView={false} />,
  },
  {
    path: "/admin/blog/view/:blogID",
    element: <BlogForm isEdit={false} isView={true} />,
  },
  {
    path: "/admin/blog/edit/:blogID",
    element: <BlogForm isEdit={true} isView={false} />,
  },
  {
    path: "/users",
    element: <Users />,
  },
];
