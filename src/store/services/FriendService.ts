import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getLocalStorage } from "../../hooks/localStorage";

export const friendApi = createApi({
  reducerPath: "friendApi",
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
  tagTypes: ["Friend"],
  endpoints: (build) => ({
    getListFriend: build.query<unknown, void>({
      query: () => ({
        url: `list-friend`,
      }),
    }),
    addFriend: build.mutation<unknown, { id: number }>({
      query: (body) => ({
        url: `friend`,
        method: "POST",
        body: body,
      }),
    }),
  }),
});

export const { useGetListFriendQuery, useAddFriendMutation } = friendApi;
