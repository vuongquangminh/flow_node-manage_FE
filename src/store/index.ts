import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage"; // lưu vào localStorage
import { setupListeners } from "@reduxjs/toolkit/query";
import { userApi } from "./services/UserService";
import { flowApi } from "./services/FlowService";
import { chatApi } from "./services/ChatService";
import { friendApi } from "./services/FriendService";
import { productApi } from "./services/ProductService";
import { persistReducer, persistStore } from "redux-persist";

// 🔹 Cấu hình persist
const persistConfig = {
  key: "root",
  storage,
  whitelist: [userApi.reducerPath], // nếu muốn persist dữ liệu API
};

// 🔹 Gộp tất cả reducer
const rootReducer = combineReducers({
  [userApi.reducerPath]: userApi.reducer,
  [flowApi.reducerPath]: flowApi.reducer,
  [chatApi.reducerPath]: chatApi.reducer,
  [friendApi.reducerPath]: friendApi.reducer,
  [productApi.reducerPath]: productApi.reducer,
});

// 🔹 Tạo persistedReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false })
      .concat(userApi.middleware)
      .concat(flowApi.middleware)
      .concat(chatApi.middleware)
      .concat(productApi.middleware)
      .concat(friendApi.middleware),
});

// 🔹 setupListeners để hỗ trợ refetchOnFocus, refetchOnReconnect
setupListeners(store.dispatch);

// 🔹 Persistor để bọc App trong <PersistGate>
export const persistor = persistStore(store);

// 🔹 Kiểu dữ liệu cho TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
