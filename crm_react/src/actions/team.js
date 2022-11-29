import * as actionType from "constants/actionTypes";
import * as api from "api/index.js";

export const getTeams = (start) => async (dispatch) => {
  dispatch({ type: actionType.LOADING_TEAM_START });
  try {
    const { data } = await api.getTeams();
    start
      ? dispatch({ type: actionType.LOADING_TEAM_SUCCESS_START, data })
      : dispatch({ type: actionType.LOADING_TEAM_SUCCESS, data });
  } catch (error) {
    dispatch({ type: actionType.LOADING_TEAM_FAIL });
    console.log(error);
  }
};

export const addTeam = (formData, navigate) => async (dispatch) => {
  dispatch({ type: actionType.LOADING_TEAM_START });
  try {
    const { data } = await api.addTeam(formData);
    dispatch({ type: actionType.ADD_TEAM, data });
    navigate("/teams");
  } catch (e) {
    dispatch({ type: actionType.LOADING_TEAM_FAIL });
    console.log(e);
  }
};
