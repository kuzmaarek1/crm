import * as actionType from "constants/actionTypes";

const clientReducer = (
  state = { clientsData: null, loading: false, error: false },
  action
) => {
  switch (action.type) {
    case actionType.LOADING_CLIENTS_START:
      return { ...state, loading: true, error: false };
    case actionType.LOADING_CLIENTS_SUCCESS:
      return {
        ...state,
        clientsData: action.data,
        loading: false,
        error: false,
      };
    case actionType.LOADING_CLIENTS_FAIL:
      return { ...state, loading: false, error: true };
    case actionType.ADD_CLIENT:
      const addClient = Array.isArray(state.clientsData)
        ? [...state.clientsData, action.data]
        : [action.data];
      return {
        ...state,
        clientsData: addClient,
        loading: false,
        error: false,
      };
    case actionType.EDIT_CLIENT:
      const editClient = state.clientsData.map((client) =>
        String(client.id) !== String(action.data.id) ? client : action.data
      );
      return {
        ...state,
        clientsData: editClient,
        loading: false,
        error: false,
      };
    case actionType.DELETE_CLIENT:
      const deleteClient = state.clientsData.filter(
        (client) => String(client.id) !== String(action.data)
      );
      return {
        ...state,
        clientsData: deleteClient,
      };
    default:
      return state;
  }
};

export default clientReducer;
