import * as actionType from "constants/actionTypes";

const teamReducer = (
  state = { teamsData: null, currentTeam: null, loading: false, error: false },
  action
) => {
  switch (action.type) {
    case actionType.LOADING_TEAMS_START:
      return { ...state, loading: true, error: false };
    case actionType.LOADING_TEAM_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        currentTeam: action?.data?.id ? action.data : null,
      };
    case actionType.LOADING_TEAMS_SUCCESS:
      return {
        ...state,
        teamsData: action.data,
        loading: false,
        error: false,
      };
    case actionType.SET_CURRENT_TEAM:
      return { ...state, currentTeam: action.data };
    case actionType.ADD_TEAM:
      const teams = Array.isArray(state.teamsData)
        ? [...state.teamsData, action.data]
        : [action.data];
      return {
        ...state,
        currentTeam: action.data,
        teamsData: teams,
        loading: false,
        error: false,
      };
    case actionType.DELETE_TEAM:
      const teamsData = state.teamsData.filter(
        (team) => String(team.id) !== String(action.data)
      );

      const currentTeam =
        String(state.currentTeam.id) !== String(action.data)
          ? state.currentTeam
          : teamsData?.length
          ? teamsData[0]
          : null;

      return {
        ...state,
        currentTeam: currentTeam,
        teamsData: teamsData,
      };
    case actionType.LOADING_TEAMS_FAIL:
      return { ...state, loading: false, error: true };
    case actionType.LOGOUT_TEAM:
      return {
        teamsData: null,
        loading: false,
        error: false,
        currentTeam: null,
      };
    default:
      return state;
  }
};

export default teamReducer;
