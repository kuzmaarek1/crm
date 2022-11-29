import * as actionType from "constants/actionTypes";
import * as api from "api/index.js";

export const getTeam = () => async (dispatch) => {
  dispatch({ type: actionType.LOADING_TEAMS_START });
  try {
    const { data } = await api.getTeam();
    console.log(data);
    dispatch({ type: actionType.LOADING_TEAM_SUCCESS, data });
  } catch (error) {
    dispatch({ type: actionType.LOADING_TEAMS_FAIL });
    console.log(error);
  }
};

export const getTeams = () => async (dispatch) => {
  dispatch({ type: actionType.LOADING_TEAMS_START });
  try {
    const { data } = await api.getTeams();
    dispatch({ type: actionType.LOADING_TEAMS_SUCCESS, data });
  } catch (error) {
    dispatch({ type: actionType.LOADING_TEAMS_FAIL });
    console.log(error);
  }
};

export const addTeam = (formData, navigate) => async (dispatch) => {
  dispatch({ type: actionType.LOADING_TEAMS_START });
  try {
    const { data } = await api.addTeam(formData);
    dispatch({ type: actionType.ADD_TEAM, data });
    navigate("/teams");
  } catch (e) {
    dispatch({ type: actionType.LOADING_TEAMS_FAIL });
    console.log(e);
  }
};
