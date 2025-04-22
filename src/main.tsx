import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./components/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
    errorElement: <>Lỗi rồi</>,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <React.Suspense fallback={<div>Đang tải...</div>}>
      <RouterProvider router={router} />
    </React.Suspense>
  </StrictMode>
);
