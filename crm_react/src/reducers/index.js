import { combineReducers } from "redux";
import auth from "reducers/auth";
import teams from "reducers/teams";
import clients from "reducers/clients";
import leads from "reducers/leads";

export const reducers = combineReducers({ auth, teams, leads, clients });
