import { createSlice } from "@reduxjs/toolkit";
import { isAnyOf } from "@reduxjs/toolkit";
import { authApiSlice } from "reducers/authApiSlice";
import { UserState } from "types";

const initialAuthUser: UserState = { user: null, auth_token: null };

const authReducer = createSlice({
  name: "auth",
  initialState: { authData: initialAuthUser },
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      authApiSlice.endpoints.signIn.matchFulfilled,
      (state, { payload }) => {
        state.authData.auth_token = payload.auth_token;
      }
    );
    builder.addMatcher(
      authApiSlice.endpoints.getUser.matchFulfilled,
      (state, { payload }) => {
        state.authData.user = payload;
      }
    );
    builder.addMatcher(
      isAnyOf(
        authApiSlice.endpoints.logOut.matchFulfilled,
        authApiSlice.endpoints.logOut.matchRejected
      ),
      (state, { payload }) => {
        state.authData = initialAuthUser;
      }
    );
  },
});

const { reducer } = authReducer;

export default reducer;
