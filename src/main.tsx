import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./components/Login";
import { Provider } from "react-redux";
import { store } from "./store";
import UserPage from "./pages/UserPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
    errorElement: <>Lỗi rồi</>,
  },
  {
    path: "/list-flow",
    element: <UserPage />,
    errorElement: <>Lỗi rồi</>,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <React.Suspense fallback={<div>Đang tải...</div>}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </React.Suspense>
  </StrictMode>
);
