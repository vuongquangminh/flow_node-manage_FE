import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../components/Login";
import UserPage from "../pages/UserPage";
import ErrorPage from "../components/ErrorPage";
import PrivateRoute from "../components/PrivateRoute";
import LayoutPage from "../components/Layout/LayoutPage";
import ChatPagePage from "../pages/chat/ChatPage";
import GetStartChatPage from "../pages/chat/GetStartChatPage";
import RegisterPage from "../components/RegisterPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
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
            path: "/conversation",
            element: <GetStartChatPage />,
          },
          {
            path: "/conversation/:id/:name",
            element: <ChatPagePage />,
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
