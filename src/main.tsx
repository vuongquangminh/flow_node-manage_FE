import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import { router } from "./routes";
import "./index.css";
import { socket, SocketContext } from "./utils/SocketContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <React.Suspense fallback={<div>Đang tải...</div>}>
      <Provider store={store}>
        <SocketContext.Provider value={socket}>
          <RouterProvider router={router} />
        </SocketContext.Provider>
      </Provider>
    </React.Suspense>
  </StrictMode>
);
