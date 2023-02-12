import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { isAnyOf } from "@reduxjs/toolkit";
import { authApiSlice } from "reducers/authApiSlice";
import { User, UserState } from "types";

const initialAuthUser: UserState = { user: null, auth_token: null };

const authReducer = createSlice({
  name: "auth",
  initialState: { authData: initialAuthUser },
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      authApiSlice.endpoints.signIn.matchFulfilled,
      (state, { payload }) => {
        state.authData = payload;
      }
    );
    builder.addMatcher(
      authApiSlice.endpoints.getUser.matchFulfilled,
      (state, { payload }: PayloadAction<User>) => {
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
