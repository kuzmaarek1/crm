import * as actionType from "constants/actionTypes";
import * as api from "api/index.js";

export const getTeam = () => async (dispatch) => {
  dispatch({ type: actionType.LOADING_TEAMS_START });
  try {
    const { data } = await api.getTeam();
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

export const searchTeams = (formData) => async (dispatch) => {
  dispatch({ type: actionType.LOADING_TEAMS_START });
  try {
    const { data } = await api.searchTeam(formData);
    dispatch({ type: actionType.LOADING_TEAMS_SUCCESS, data });
    return data;
  } catch (e) {
    dispatch({ type: actionType.LOADING_TEAMS_FAIL });
    console.log(e);
  }
};

export const deleteTeam = (id) => async (dispatch) => {
  try {
    await api.deleteTeam(id);
    dispatch({ type: actionType.DELETE_TEAM, data: id });
  } catch (e) {
    console.log(e);
  }
};

export const addMember = (request, id) => async (dispatch) => {
  const { username } = request;
  /*
  try {
    await api.signUp(request);
  } catch (e) {
    alert("Don't create user");
  }
  */
  try {
    const user = await api.addMember(id, { username });
    dispatch({
      type: actionType.ADD_MEMBER,
      data: { user: user.data, id: id },
    });
  } catch (e) {
    alert("Don't add member ");
  }
};
