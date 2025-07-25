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
import ChatToolPage from "../pages/chat/ChatToolPage";
import AiEmbeddingPage from "../pages/chat/AiEmbeddingPage";
import OAuthCallback from "../components/OAuthCallback";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/oauth-callback",
    element: <OAuthCallback />,
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
        element: <LayoutPage />,
        children: [
          {
            path: "/chatbot",
            element: <ChatBotPage />,
          },
          {
            path: "/chat-tool",
            element: <ChatToolPage />,
          },
          {
            path: "/ai-agent",
            element: <AgentPage />,
          },
          {
            path: "/ai-embedding",
            element: <AiEmbeddingPage />,
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
