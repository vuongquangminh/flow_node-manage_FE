import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { getLocalStorage } from "../hooks/localStorage";

const baseQuery = () => {
  return fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    prepareHeaders: (headers) => {
      const token = getLocalStorage({ key: "token" });

      // If we have a token set in state, let's assume that we should be passing it.
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  });
};

export default baseQuery;
