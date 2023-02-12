import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "store";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:8000",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.authData.auth_token;
    if (token) {
      headers.set("authorization", `Token  ${token}`);
    }
    return headers;
  },
});

export const apiSlice = createApi({
  baseQuery: baseQuery,
  tagTypes: ["Auth", "Team", "Lead", "Client"],
  endpoints: (builder) => ({}),
});
