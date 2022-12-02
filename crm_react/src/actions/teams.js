import * as api from "api/index.js";
import {
  loadingTeamsStart,
  loadingTeamSuccess,
  loadingTeamsSuccess,
  loadingTeamsFail,
  addTeamSuccess,
  addMemberSuccess,
  deleteTeamSuccess,
} from "reducers/teams.js";

export const getTeam = () => async (dispatch) => {
  dispatch(loadingTeamsStart());
  try {
    const { data } = await api.getTeam();
    dispatch(loadingTeamSuccess({ data }));
  } catch (error) {
    dispatch(loadingTeamsFail());
    console.log(error);
  }
};

export const getTeams = () => async (dispatch) => {
  dispatch(loadingTeamsStart());
  try {
    const { data } = await api.getTeams();
    dispatch(loadingTeamsSuccess({ data }));
  } catch (error) {
    dispatch(loadingTeamsFail());
    console.log(error);
  }
};

export const addTeam = (formData, navigate) => async (dispatch) => {
  dispatch(loadingTeamsStart());
  try {
    const { data } = await api.addTeam(formData);
    dispatch(addTeamSuccess({ data }));
    navigate("/teams");
  } catch (e) {
    dispatch(loadingTeamsFail());
    console.log(e);
  }
};

export const searchTeams = (formData) => async (dispatch) => {
  dispatch(loadingTeamsStart());
  try {
    const { data } = await api.searchTeam(formData);
    dispatch(loadingTeamsSuccess({ data }));
    return data;
  } catch (e) {
    dispatch(loadingTeamsFail());
    console.log(e);
  }
};

export const deleteTeam = (id) => async (dispatch) => {
  try {
    await api.deleteTeam(id);
    dispatch(deleteTeamSuccess({ data: id }));
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
    dispatch(addMemberSuccess({ data: { user: user.data, id: id } }));
  } catch (e) {
    console.log(e);
    alert("Don't add member ");
  }
};
