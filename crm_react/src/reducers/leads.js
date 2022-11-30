import * as actionType from "constants/actionTypes";

const leadReducer = (
  state = { leadsData: null, loading: false, error: false },
  action
) => {
  switch (action.type) {
    case actionType.LOADING_LEADS_START:
      return { ...state, loading: true, error: false };
    case actionType.LOADING_LEADS_SUCCESS:
      return {
        ...state,
        leadsData: action.data,
        loading: false,
        error: false,
      };
    case actionType.LOADING_LEADS_FAIL:
      return { ...state, loading: false, error: true };
    case actionType.ADD_LEAD:
      const addLead = Array.isArray(state.leadsData)
        ? [...state.leadsData, action.data]
        : [action.data];
      return {
        ...state,
        leadsData: addLead,
        loading: false,
        error: false,
      };
    case actionType.EDIT_LEAD:
      const editLead = state.leadsData.map((lead) =>
        String(lead.id) !== String(action.data.id) ? lead : action.data
      );
      return {
        ...state,
        leadsData: editLead,
        loading: false,
        error: false,
      };
    case actionType.DELETE_LEAD:
      const deleteLead = state.leadsData.filter(
        (lead) => String(lead.id) !== String(action.data)
      );
      return {
        ...state,
        leadsData: deleteLead,
      };
    default:
      return state;
  }
};

export default leadReducer;
