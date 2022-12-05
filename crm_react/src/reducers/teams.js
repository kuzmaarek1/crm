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
    deleteTeamSuccess(state, action) {
      const deleteTeam = action.payload.data.teams.filter(
        (team) => String(team.id) !== String(action.payload.data.id)
      );

      const currentTeam =
        String(state.currentTeam.id) !== String(action.payload.data.id)
          ? state.currentTeam
          : deleteTeam?.length
          ? deleteTeam[0]
          : null;
      state.currentTeam = currentTeam;
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
  loadingTeamsStart,
  loadingTeamSuccess,
  loadingTeamsSuccess,
  loadingTeamsFail,
  addTeamSuccess,
  addMemberSuccess,
  setCurrentTeam,
  deleteTeamSuccess,
  logoutTeam,
} = actions;

export default reducer;
