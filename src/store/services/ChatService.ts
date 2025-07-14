import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import headerTokenRequest from "../../utils/headerTokenRequest";

export const chatApi = createApi({
  reducerPath: "chatApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL + '/api/',
    prepareHeaders: (headers) => headerTokenRequest(headers),
  }),
  tagTypes: ["Chat"],
  endpoints: (build) => ({
    getHistoryMessage: build.query<
      unknown,
      { sender_id: number; receiver_id: number }
    >({
      query: ({ sender_id, receiver_id }) => ({
        url: `history-message`,
        params: { sender_id, receiver_id },
      }),
    }),
  }),
});

export const { useGetHistoryMessageQuery } = chatApi;
