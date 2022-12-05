import { configureStore } from "@reduxjs/toolkit";
import auth from "reducers/auth";
import teams from "reducers/teams";
import { apiSlice } from "api/apiSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth,
    teams,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
