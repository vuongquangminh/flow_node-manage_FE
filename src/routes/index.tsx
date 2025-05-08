import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../components/Login";
import UserPage from "../pages/UserPage";
import ErrorPage from "../components/ErrorPage";
import PrivateRoute from "../components/PrivateRoute";
import LayoutPage from "../components/Layout/LayoutPage";
import ChatPage from "../pages/chat/ChatPage";
import GetStartChatPage from "../pages/chat/GetStartChatPage";
import RegisterPage from "../components/RegisterPage";
import ChatBotPage from "../pages/chat/ChatBotPage";
import AgentPage from "../pages/chat/AgentPage";

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
            element: <ChatPage />,
          },
        ],
      },
      {
        path: "/chatbot",
        element: <ChatBotPage />,
      },
      {
        path: "/ai-agent",
        element: <AgentPage />,
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);
