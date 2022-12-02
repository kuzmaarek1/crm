import * as api from "api/index.js";
import {
  loadingClientsStart,
  loadingClientsSuccess,
  loadingClientsFail,
  addClientSuccess,
  editClientSuccess,
  deleteClientSuccess,
} from "reducers/clients";

export const getClients = (id) => async (dispatch) => {
  dispatch(loadingClientsStart());
  try {
    const { data } = await api.getClients(id);
    dispatch(loadingClientsSuccess({ data }));
  } catch (error) {
    dispatch(loadingClientsFail());
    console.log(error);
  }
};

export const addClient = (id, formData, navigate) => async (dispatch) => {
  dispatch(loadingClientsStart());
  try {
    await api.createClient(id, formData);
    dispatch(addClientSuccess({ data: { id, ...formData } }));
    navigate("/clients");
  } catch (e) {
    dispatch(loadingClientsFail());
    console.log(e);
  }
};

export const searchClients = (team, formData) => async (dispatch) => {
  dispatch(loadingClientsStart());
  try {
    const { data } = await api.searchClient(team, formData);
    dispatch(loadingClientsSuccess({ data }));
    return data;
  } catch (e) {
    dispatch(loadingClientsFail());
    console.log(e);
  }
};

export const editClient =
  (client, team, formData, navigate) => async (dispatch) => {
    dispatch(loadingClientsStart());
    try {
      await api.editClient(client, team, formData, navigate);
      dispatch(editClientSuccess({ data: { id: client, ...formData } }));
      navigate("/clients");
    } catch (e) {
      dispatch(loadingClientsFail());
      console.log(e);
    }
  };

export const deleteClient = (client, team) => async (dispatch) => {
  try {
    await api.deleteClient(client, team);
    dispatch(deleteClientSuccess({ data: client }));
  } catch (e) {
    console.log(e);
  }
};
