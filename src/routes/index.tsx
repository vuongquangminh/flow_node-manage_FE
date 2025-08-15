import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../components/ErrorPage";
import PrivateRoute from "../components/PrivateRoute";
import LayoutPage from "../components/Layout/LayoutPage";
import OAuthCallback from "../components/OAuthCallback";
import Homepage from "../pages/user/homepage/HomePage";
import Products from "../pages/user/products";
import ProductDetail from "../pages/user/products/ProductDetail";
import OrderPage from "../pages/user/orders";
import AdminLayout from "../components/Layout/AdminLayout";
import OrderAdminPage from "../pages/admin/orders";
import AccountAdminPage from "../pages/admin/account";
import ProductAdminPage from "../pages/admin/products";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
  },
  {
    path: "/products",
    element: <Products />,
  },
  {
    path: "/products/:id/:name",
    element: <ProductDetail />,
  },
  {
    path: "/oauth-callback",
    element: <OAuthCallback />,
  },

  {
    element: <PrivateRoute />,
    children: [
      {
        element: <LayoutPage />,
        children: [
          {
            path: "/order",
            element: <OrderPage />,
          },
        ],
      },
      {
        path: "/admin",
        element: <PrivateRoute roles={["admin"]} />,
        children: [
          {
            element: <AdminLayout />,
            children: [
              { path: "users", element: <AccountAdminPage /> },
              { path: "orders", element: <OrderAdminPage /> },
              { path: "products", element: <ProductAdminPage /> },
              // ... thêm các route khác
            ],
          },
        ],
      },
      // {
      //   element: <PrivateRoute roles={["admin"]} />,
      //   children: [
      //     {
      //       path: "/user",
      //       element: <AccountPage />,
      //     },
      //     // {
      //     //   path: "/chatbot",
      //     //   element: <ChatBotPage />,
      //     // },
      //     // {
      //     //   path: "/conversation",
      //     //   element: <GetStartChatPage />,
      //     // },
      //     // {
      //     //   path: "/conversation/:id/:name",
      //     //   element: <ChatPage />,
      //     // },
      //     // {
      //     //   path: "/chat-tool",
      //     //   element: <ChatToolPage />,
      //     // },
      //     // {
      //     //   path: "/ai-agent",
      //     //   element: <AgentPage />,
      //     // },
      //     // {
      //     //   path: "/ai-embedding",
      //     //   element: <AiEmbeddingPage />,
      //     // },
      //   ],
      // },
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);
