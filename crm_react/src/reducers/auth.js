import { createSlice } from "@reduxjs/toolkit";

const authReducer = createSlice({
  name: "auth",
  initialState: { authData: null, loading: false, errors: false },
  reducers: {
    authStart(state, action) {
      state.loading = true;
      state.errors = false;
    },
    authToken(state, action) {
      state.authData = action.payload.data;
      state.loading = true;
      state.errors = false;
    },
    authSuccess(state, action) {
      state.authData.user = action.payload.data;
      state.loading = false;
      state.errors = false;
    },
    authFail(state, action) {
      state.authData = null;
      state.loading = false;
      state.errors = true;
    },
    logout(state, action) {
      state.authData = null;
      state.loading = false;
      state.errors = false;
    },
  },
});

const { actions, reducer } = authReducer;

export const { authStart, authToken, authSuccess, authFail, logout } = actions;

export default reducer;
