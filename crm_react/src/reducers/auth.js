import { createSlice } from "@reduxjs/toolkit";
import { isAnyOf } from "@reduxjs/toolkit";
import { authApiSlice } from "reducers/authApiSlice";

const authReducer = createSlice({
  name: "auth",
  initialState: { authData: null },
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
        state.authData = null;
      }
    );
  },
});

const { reducer } = authReducer;

export default reducer;
