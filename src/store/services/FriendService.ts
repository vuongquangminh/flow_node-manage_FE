import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import headerTokenRequest from "../../utils/headerTokenRequest";

export const friendApi = createApi({
  reducerPath: "friendApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL + '/api/',
    prepareHeaders: (headers) => headerTokenRequest(headers),
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
