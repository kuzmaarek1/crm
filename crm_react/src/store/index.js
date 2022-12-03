import { configureStore } from "@reduxjs/toolkit";
import auth from "reducers/auth";
import teams from "reducers/teams";
import clients from "reducers/clients";
import leads from "reducers/leads";
import { apiSlice } from "api/apiSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth,
    teams,
    clients,
    leads,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
