import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { teamsApiSlice } from "reducers/teamsApiSlice";
import { authApiSlice } from "reducers/authApiSlice";
import { isAnyOf } from "@reduxjs/toolkit";
import { Member, CurrentTeamState } from "types";

const CurrentTeamIsNull = {
  id: null,
  name: null,
  description: null,
  created_by: null,
  members: [],
};

const initialState: CurrentTeamState = {
  currentTeam: CurrentTeamIsNull,
};

const teamReducer = createSlice({
  name: "teams",
  initialState,
  reducers: {
    setCurrentTeam(state, action) {
      state.currentTeam = action.payload.data;
    },
    editTeamSuccess(state, action) {
      if (state.currentTeam.id === action.payload.data.id) {
        state.currentTeam.name = action.payload.data.data.name;
      }
    },
    addMemberSuccess(state, action: PayloadAction<Member>) {
      if (String(state.currentTeam.id) === String(action.payload.data.id)) {
        state.currentTeam.members.push(action.payload.data.user);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      teamsApiSlice.endpoints.getTeam.matchFulfilled,
      (state, { payload }) => {
        state.currentTeam = payload?.id ? payload : CurrentTeamIsNull;
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
        state.currentTeam = CurrentTeamIsNull;
      }
    );
  },
});

const { actions, reducer } = teamReducer;

export const { setCurrentTeam, editTeamSuccess, addMemberSuccess } = actions;

export default reducer;
