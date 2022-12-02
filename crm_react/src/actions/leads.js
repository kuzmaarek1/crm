import * as api from "api/index.js";
import {
  loadingLeadsStart,
  loadingLeadsSuccess,
  loadingLeadsFail,
  addLeadSuccess,
  editLeadSuccess,
  deleteLeadSuccess,
} from "reducers/leads.js";
import { addClientSuccess } from "reducers/clients";

export const getLeads = (id) => async (dispatch) => {
  dispatch(loadingLeadsStart());
  try {
    const { data } = await api.getLeads(id);
    dispatch(loadingLeadsSuccess({ data }));
  } catch (error) {
    dispatch(loadingLeadsFail());
    console.log(error);
  }
};

export const addLead = (id, formData, navigate) => async (dispatch) => {
  dispatch(loadingLeadsStart());
  try {
    await api.createLead(id, formData);
    dispatch(addLeadSuccess({ data: { id, ...formData } }));
    navigate("/leads");
  } catch (e) {
    dispatch(loadingLeadsFail());
    console.log(e);
  }
};

export const searchLeads = (team, formData) => async (dispatch) => {
  dispatch(loadingLeadsStart());
  try {
    const { data } = await api.searchLead(team, formData);
    dispatch(loadingLeadsSuccess({ data }));
    return data;
  } catch (e) {
    dispatch(loadingLeadsFail());
    console.log(e);
  }
};

export const editLead =
  (lead, team, formData, navigate) => async (dispatch) => {
    dispatch(loadingLeadsStart());
    try {
      await api.editLead(lead, team, formData, navigate);
      dispatch(editLeadSuccess({ data: { id: lead, ...formData } }));
      navigate("/leads");
    } catch (e) {
      dispatch(loadingLeadsFail());
      console.log(e);
    }
  };

export const deleteLead = (lead, team) => async (dispatch) => {
  try {
    await api.deleteLead(lead, team);
    dispatch(deleteLeadSuccess({ data: lead }));
  } catch (e) {
    console.log(e);
  }
};

export const convertToClient = (lead, team) => async (dispatch) => {
  try {
    const { id, ...otherLead } = lead;
    dispatch(loadingLeadsStart());
    const { data } = await api.convetLeadToClient(lead.id, team);
    console.log(data);
    dispatch(deleteLeadSuccess({ data: lead.id }));
    dispatch(
      addClientSuccess({
        data: { id: data, ...otherLead },
      })
    );
  } catch (e) {
    dispatch(loadingLeadsFail());
    console.log(e);
  }
};
