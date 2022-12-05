import { useNavigate } from "react-router-dom";
import {
  useCreateLeadMutation,
  useEditLeadMutation,
  useConvertLeadToClientMutation,
  useDeleteLeadMutation,
} from "reducers/leadsApiSlice";

export const useLeads = () => {
  const navigate = useNavigate();
  const [createLead] = useCreateLeadMutation();
  const [editLead] = useEditLeadMutation();
  const [convertLeadToClient] = useConvertLeadToClientMutation();
  const [deleteLead] = useDeleteLeadMutation();

  const handleAddLead = async (id, data) => {
    try {
      await createLead({ id, data });
      navigate("/leads");
    } catch (e) {
      console.log(e);
    }
  };

  const handleDeleteLead = async (lead, team) => {
    try {
      await deleteLead({ lead, team });
    } catch (e) {
      console.log(e);
    }
  };

  const handleEditLead = async (lead, team, data) => {
    try {
      await editLead({ lead, team, data });
      navigate("/leads");
    } catch (e) {
      console.log(e);
    }
  };

  const handleConvertToClient = async (lead, team) => {
    try {
      await convertLeadToClient({ lead, team });
      navigate("/clients");
    } catch (e) {
      console.log(e);
    }
  };

  return {
    handleAddLead,
    handleDeleteLead,
    handleEditLead,
    handleConvertToClient,
  };
};
