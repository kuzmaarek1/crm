import * as actionType from "constants/actionTypes";

const authReducer = (
  state = { authData: null, loading: false, errors: false },
  action
) => {
  switch (action.type) {
    case actionType.AUTH_START:
      return { ...state, loading: true, errors: false };

    case actionType.AUTH_TOKEN:
      return { ...state, authData: action.data, loading: true, errors: false };

    case actionType.AUTH_SUCCESS:
      return {
        ...state,
        authData: { ...state.authData, user: { ...action.data } },
        loading: false,
        errors: false,
      };

    case actionType.AUTH_FAIL:
      return { ...state, loading: false, errors: true };

    case actionType.LOGOUT:
      return { ...state, authData: null, loading: false, errors: false };

    default:
      return state;
  }
};

export default authReducer;
