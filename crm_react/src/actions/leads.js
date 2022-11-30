import * as actionType from "constants/actionTypes";
import * as api from "api/index.js";

export const getLeads = (id) => async (dispatch) => {
  dispatch({ type: actionType.LOADING_LEADS_START });
  try {
    const { data } = await api.getLeads(id);
    dispatch({ type: actionType.LOADING_LEADS_SUCCESS, data });
  } catch (error) {
    dispatch({ type: actionType.LOADING_LEADS_FAIL });
    console.log(error);
  }
};

export const addLead = (id, formData, navigate) => async (dispatch) => {
  dispatch({ type: actionType.LOADING_LEADS_START });
  try {
    await api.createLead(id, formData);
    dispatch({ type: actionType.ADD_LEAD, data: formData });
    navigate("/leads");
  } catch (e) {
    dispatch({ type: actionType.LOADING_LEADS_START });
    console.log(e);
  }
};

export const searchTeams = (team, formData) => async (dispatch) => {
  dispatch({ type: actionType.LOADING_LEADS_START });
  try {
    const { data } = await api.searchLead(team, formData);
    dispatch({ type: actionType.LOADING_LEADS_SUCCESS, data });
    return data;
  } catch (e) {
    dispatch({ type: actionType.LOADING_LEADS_FAIL });
    console.log(e);
  }
};

export const editLead =
  (lead, team, formData, navigate) => async (dispatch) => {
    dispatch({ type: actionType.LOADING_LEADS_START });
    try {
      const { data } = await api.editLead(lead, team, formData, navigate);
      dispatch({ type: actionType.EDIT_LEAD, data: { id: lead, ...formData } });
      navigate("/leads");
    } catch (e) {
      dispatch({ type: actionType.LOADING_LEADS_FAIL });
      console.log(e);
    }
  };

export const deleteLead = (lead, team) => async (dispatch) => {
  try {
    await api.deleteLead(lead, team);
    dispatch({ type: actionType.DELETE_LEAD, data: lead });
  } catch (e) {
    console.log(e);
  }
};
