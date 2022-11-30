import * as actionType from "constants/actionTypes";
import * as api from "api/index.js";

export const getClients = (id) => async (dispatch) => {
  dispatch({ type: actionType.LOADING_CLIENTS_START });
  try {
    const { data } = await api.getClients(id);
    dispatch({ type: actionType.LOADING_CLIENTS_SUCCESS, data });
  } catch (error) {
    dispatch({ type: actionType.LOADING_CLIENTS_FAIL });
    console.log(error);
  }
};

export const addClient = (id, formData, navigate) => async (dispatch) => {
  dispatch({ type: actionType.LOADING_CLIENTS_START });
  try {
    await api.createClient(id, formData);
    dispatch({
      type: actionType.ADD_CLIENT,
      data: { id, ...formData },
    });
    navigate("/clients");
  } catch (e) {
    dispatch({ type: actionType.LOADING_CLIENTS_START });
    console.log(e);
  }
};

export const searchClients = (team, formData) => async (dispatch) => {
  dispatch({ type: actionType.LOADING_CLIENTS_START });
  try {
    const { data } = await api.searchClient(team, formData);
    dispatch({ type: actionType.LOADING_CLIENTS_SUCCESS, data });
    return data;
  } catch (e) {
    dispatch({ type: actionType.LOADING_CLIENTS_FAIL });
    console.log(e);
  }
};

export const editClient =
  (client, team, formData, navigate) => async (dispatch) => {
    dispatch({ type: actionType.LOADING_CLIENTS_START });
    try {
      await api.editClient(client, team, formData, navigate);
      dispatch({
        type: actionType.EDIT_CLIENT,
        data: { id: client, ...formData },
      });
      navigate("/clients");
    } catch (e) {
      dispatch({ type: actionType.LOADING_CLIENTS_FAIL });
      console.log(e);
    }
  };

export const deleteClient = (client, team) => async (dispatch) => {
  try {
    await api.deleteClient(client, team);
    dispatch({ type: actionType.DELETE_CLIENT, data: client });
  } catch (e) {
    console.log(e);
  }
};
