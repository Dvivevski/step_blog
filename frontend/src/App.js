import logo from "./logo.svg";
import "./App.scss";
import { Suspense, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { removeValueFromLocalStorage } from "./helper/token";
import { protectedRoutes } from "./routes/protected";
import { unProtectedRoutes } from "./routes/unProtected";
import { request } from "./api/request";
import ErrorPage from "./components/errorPage/ErrorPage";
import { useDispatch, useSelector } from "react-redux";
import { updateUserAction } from "./reducers/users/actions";
import { updateIsAuthAction } from "./reducers/users/actions";
import Blogs from "./components/blogs/Blogs";
import BlogView from "./components/blogs/BlogView";

function App() {
  const { isAuth } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  // const router = createBrowserRouter(
  //   isAuth ? protectedRoutes.map((e) => e) : unProtectedRoutes.map((e) => e)
  // );

  const pRouter = createBrowserRouter([
    ...protectedRoutes.map((e) => e),
    {
      path: "/",
      element: <Blogs />,
    },
    {
      path: "/blog/:blogID",
      element: <BlogView />,
    },
    {
      path: "*",
      element: <ErrorPage />,
    },
  ]);

  const nRouter = createBrowserRouter([
    ...unProtectedRoutes.map((e) => e),
    {
      path: "/",
      element: <Blogs />,
    },
    {
      path: "/blog/:blogID",
      element: <BlogView />,
    },
    {
      path: "*",
      element: <ErrorPage />,
    },
  ]);

  const logout = async () => {
    try {
      await request.get("/admin");

      removeValueFromLocalStorage("accessToken");
      dispatch(updateUserAction(null));
      dispatch(updateIsAuthAction(false));
      window.location.href = "/admin";
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="App">
      {/* <Suspense fallback={() => <h1>Loading...</h1>}> */}
      <RouterProvider router={isAuth ? pRouter : nRouter} />
      {/* </Suspense> */}
      <button
        id="logout_btn"
        style={{ visibility: "hidden", position: "absolute", top: "0" }}
        onClick={logout}
      >
        .
      </button>
    </div>
  );
}

export default App;
