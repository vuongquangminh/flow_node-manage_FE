import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import headerRequest from "../../utils/headerRequest";

export const chatApi = createApi({
  reducerPath: "chatApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    prepareHeaders: (headers) => headerRequest(headers),
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
