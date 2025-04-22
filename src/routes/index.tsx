import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../components/Login";
import UserPage from "../pages/UserPage";
import ErrorPage from "../components/ErrorPage";
import PrivateRoute from "../components/PrivateRoute";
import FlowPage from "../pages/FlowPage";
import LayoutPage from "../components/Layout/LayoutPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    element: <PrivateRoute />,
    children: [
      {
        element: <LayoutPage />,
        children: [
          {
            path: "/user",
            element: <UserPage />,
          },
          {
            path: "/flow",
            element: <FlowPage />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);
