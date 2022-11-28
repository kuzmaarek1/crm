import * as actionType from "constants/actionTypes";

const teamReducer = (
  state = { teamsData: null, loading: false, error: false },
  action
) => {
  switch (action.type) {
    case actionType.LOADING_START:
      return { ...state, loading: true, error: false };
    case actionType.LOADING_SUCCESS:
      return { ...state, teamsData: action.data, loading: false, error: false };
    case actionType.LOADING_FAIL:
      return { ...state, loading: false, error: true };
    default:
      return state;
  }
};

export default teamReducer;
