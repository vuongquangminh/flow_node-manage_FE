import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import headerTokenRequest from "./headerTokenRequest";

const baseQuery = () => {
  return fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL + '/api/',
    prepareHeaders: (headers) => headerTokenRequest(headers),
  });
};

export default baseQuery;
