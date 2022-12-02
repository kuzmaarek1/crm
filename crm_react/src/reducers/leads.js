import { createSlice } from "@reduxjs/toolkit";

const leadReducer = createSlice({
  name: "leads",
  initialState: { leadsData: [], loading: false, error: false },
  reducers: {
    loadingLeadsStart(state, action) {
      state.loading = true;
      state.error = false;
    },
    loadingLeadsSuccess(state, action) {
      state.leadsData = action.payload.data;
      state.loading = false;
      state.error = false;
    },
    loadingLeadsFail(state, action) {
      state.loading = false;
      state.error = true;
    },
    addLeadSuccess(state, action) {
      state.leadsData.push(action.payload.data);
      state.loading = false;
      state.error = false;
    },
    deleteLeadSuccess(state, action) {
      const deleteLead = state.leadsData.filter(
        (lead) => String(lead.id) !== String(action.payload.data)
      );
      state.leadsData = deleteLead;
      state.loading = false;
      state.error = false;
    },
    editLeadSuccess(state, action) {
      const editLead = state.leadsData.map((lead) =>
        String(lead.id) !== String(action.payload.data.id)
          ? lead
          : action.payload.data
      );
      state.leadsData = editLead;
      state.loading = false;
      state.error = false;
    },
  },
});

const { actions, reducer } = leadReducer;
export const {
  loadingLeadsStart,
  loadingLeadsSuccess,
  loadingLeadsFail,
  addLeadSuccess,
  editLeadSuccess,
  deleteLeadSuccess,
} = actions;

export default reducer;
