import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addLead,
  deleteLead,
  searchLeads,
  getLeads,
  editLead,
} from "actions/leads";

export const useLeads = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddLead = (id, data) => {
    dispatch(addLead(id, data, navigate));
  };

  const handleDeleteLead = (lead, team) => {
    dispatch(deleteLead(lead, team));
  };

  const handleSearchLeads = (team, name) => {
    name ? dispatch(searchLeads(team, name)) : dispatch(getLeads(team));
  };

  const handleEditLead = (lead, team, data) => {
    dispatch(editLead(lead, team, data, navigate));
  };
  /*
  const convert = async (lead, team) => {
    try {
      await api.convetLeadToClient(lead, team);
    } catch (e) {
      console.log(e);
    }
  };
  */
  return {
    handleAddLead,
    handleDeleteLead,
    handleSearchLeads,
    handleEditLead,
  };
};
