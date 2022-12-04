import { createSlice } from "@reduxjs/toolkit";
import { teamsApiSlice } from "reducers/teamsApiSlice";

const teamReducer = createSlice({
  name: "teams",
  initialState: {
    teamsData: [],
    currentTeam: null,
    loading: false,
    error: false,
  },
  reducers: {
    loadingTeamsStart(state, action) {
      state.loading = true;
      state.error = false;
    },
    loadingTeamSuccess(state, action) {
      state.currentTeam = action?.payload.data?.id ? action.payload.data : null;
      state.loading = false;
      state.error = false;
    },
    loadingTeamsSuccess(state, action) {
      state.teamsData = action.payload.data;
      state.loading = false;
      state.error = false;
    },
    loadingTeamsFail(state, action) {
      state.loading = false;
      state.error = true;
    },
    addTeamSuccess(state, action) {
      state.teamsData.push(action.payload.data);
      state.currentTeam = action.payload.data;
      state.loading = false;
      state.error = false;
    },
    setCurrentTeam(state, action) {
      state.currentTeam = action.payload.data;
    },
    deleteTeamSuccess(state, action) {
      const deleteTeam = state.teamsData.filter(
        (team) => String(team.id) !== String(action.payload.data)
      );

      const currentTeam =
        String(state.currentTeam.id) !== String(action.payload.data)
          ? state.currentTeam
          : deleteTeam?.length
          ? deleteTeam[0]
          : null;

      state.teamsData = deleteTeam;
      state.currentTeam = currentTeam;
      state.loading = false;
      state.error = false;
    },
    addMemberSuccess(state, action) {
      console.log(action);
      const index = state.teamsData.findIndex(
        (team) => String(team.id) === String(action.payload.data.id)
      );
      state.teamsData[index].members.push(action.payload.data.user);
      state.loading = false;
      state.error = false;
    },
    logoutTeam(state, action) {
      state.teamsData = [];
      state.currentTeam = null;
      state.loading = false;
      state.error = false;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      teamsApiSlice.endpoints.addTeam.matchFulfilled,
      (state, { payload }) => {
        console.log(payload);
        state.teamsData.push(payload);
        state.currentTeam = payload;
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
