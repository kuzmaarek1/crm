import { combineReducers } from "redux";
import auth from "reducers/auth";
import teams from "reducers/auth";

export const reducers = combineReducers({ auth, teams });
