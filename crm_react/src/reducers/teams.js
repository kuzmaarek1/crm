import * as actionType from "constants/actionTypes";

const teamReducer = (
  state = { teamsData: null, currentTeam: null, loading: false, error: false },
  action
) => {
  switch (action.type) {
    case actionType.LOADING_TEAM_START:
      return { ...state, loading: true, error: false };
    case actionType.LOADING_TEAM_SUCCESS_START:
      return {
        ...state,
        teamsData: action.data,
        loading: false,
        error: false,
        currentTeam: Array.isArray(action.data) ? action.data[0] : null,
      };
    case actionType.LOADING_TEAM_SUCCESS:
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
        teamsData: teams,
        loading: false,
        error: false,
      };
    case actionType.LOADING_TEAM_FAIL:
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
