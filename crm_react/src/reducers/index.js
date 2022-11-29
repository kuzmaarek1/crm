import { combineReducers } from "redux";
import auth from "reducers/auth";
import teams from "reducers/teams";

export const reducers = combineReducers({ auth, teams });
