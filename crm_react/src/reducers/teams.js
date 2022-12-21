import { createSlice } from "@reduxjs/toolkit";
import { teamsApiSlice } from "reducers/teamsApiSlice";
import { authApiSlice } from "reducers/authApiSlice";
import { isAnyOf } from "@reduxjs/toolkit";

const teamReducer = createSlice({
  name: "teams",
  initialState: {
    currentTeam: null,
  },
  reducers: {
    setCurrentTeam(state, action) {
      state.currentTeam = action.payload.data;
    },
    editTeamSuccess(state, action) {
      if (state.currentTeam.id === action.payload.data.id) {
        state.currentTeam.name = action.payload.data.data.name;
      }
    },
    addMemberSuccess(state, action) {
      if (String(state.currentTeam.id) === String(action.payload.data.id)) {
        state.currentTeam.members.push(action.payload.data.user);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      teamsApiSlice.endpoints.getTeam.matchFulfilled,
      (state, { payload }) => {
        state.currentTeam = payload?.id ? payload : null;
      }
    );
    builder.addMatcher(
      teamsApiSlice.endpoints.addTeam.matchFulfilled,
      (state, { payload }) => {
        state.currentTeam = payload;
      }
    );
    builder.addMatcher(
      isAnyOf(
        authApiSlice.endpoints.logOut.matchFulfilled,
        authApiSlice.endpoints.logOut.matchRejected
      ),
      (state, { payload }) => {
        state.currentTeam = null;
      }
    );
  },
});

const { actions, reducer } = teamReducer;

export const {
  setCurrentTeam,
  deleteTeamSuccess,
  editTeamSuccess,
  addMemberSuccess,
} = actions;

export default reducer;
