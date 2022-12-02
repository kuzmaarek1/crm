import { configureStore } from "@reduxjs/toolkit";
import auth from "reducers/auth";
import teams from "reducers/teams";
import clients from "reducers/clients";
import leads from "reducers/leads";

export const store = configureStore({
  reducer: {
    auth,
    teams,
    clients,
    leads,
  },
});
