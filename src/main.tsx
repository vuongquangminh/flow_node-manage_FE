import React from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { persistor, store } from "./store";
import { router } from "./routes";
import "./i18n";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./index.css";
import { PersistGate } from "redux-persist/integration/react";
import initI18n from "./i18n";

initI18n("en");

createRoot(document.getElementById("root")!).render(
  <React.Suspense fallback={<div>Đang tải...</div>}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </React.Suspense>
);
