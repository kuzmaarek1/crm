import { createSlice } from "@reduxjs/toolkit";

const clientReducer = createSlice({
  name: "clients",
  initialState: { clientsData: [], loading: false, error: false },
  reducers: {
    loadingClientsStart(state, action) {
      state.loading = true;
      state.error = false;
    },
    loadingClientsSuccess(state, action) {
      state.clientsData = action.payload.data;
      state.loading = true;
      state.error = false;
    },
    loadingClientsFail(state, action) {
      state.loading = false;
      state.error = true;
    },
    addClientSuccess(state, action) {
      state.clientsData.push(action.payload.data);
      state.loading = false;
      state.error = false;
    },
    editClientSuccess(state, action) {
      const editClient = state.clientsData.map((client) =>
        String(client.id) !== String(action.payload.data.id)
          ? client
          : action.payload.data
      );
      state.clientsData = editClient;
      state.loading = false;
      state.error = false;
    },
    deleteClientSuccess(state, action) {
      const deleteClient = state.clientsData.filter(
        (client) => String(client.id) !== String(action.payload.data)
      );
      state.clientsData = deleteClient;
      state.loading = false;
      state.error = false;
    },
  },
});

const { actions, reducer } = clientReducer;

export const {
  loadingClientsStart,
  loadingClientsSuccess,
  loadingClientsFail,
  addClientSuccess,
  editClientSuccess,
  deleteClientSuccess,
} = actions;

export default reducer;
