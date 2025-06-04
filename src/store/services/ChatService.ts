import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getLocalStorage } from "../../hooks/localStorage";

export const chatApi = createApi({
  reducerPath: "chatApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    prepareHeaders: (headers) => {
      const token = getLocalStorage({ key: "token" });
      
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ["Chat"],
  endpoints: (build) => ({
    getHistoryMessage: build.query<unknown, { sender_id: number, receiver_id: number }>({
      query: ({ sender_id, receiver_id }) => ({
        url: `history-message`,
        params: { sender_id, receiver_id  },
      }),
    }),
  }),
});

export const { useGetHistoryMessageQuery } = chatApi;
