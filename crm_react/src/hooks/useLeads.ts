import { useNavigate } from "react-router-dom";
import { useToast } from "hooks/useToast";
import {
  useCreateLeadMutation,
  useEditLeadMutation,
  useConvertLeadToClientMutation,
  useDeleteLeadMutation,
} from "reducers/leadsApiSlice";
import type { LeadAndClientValues, LeadAndClient } from "types";

export const useLeads = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [createLead] = useCreateLeadMutation();
  const [editLead] = useEditLeadMutation();
  const [convertLeadToClient] = useConvertLeadToClientMutation();
  const [deleteLead] = useDeleteLeadMutation();

  const handleAdd = async (id: number, data: LeadAndClientValues) => {
    return await toast.handleDisplayBanner(
      createLead({ id, data }),
      `Adding lead ${data.first_name} ${data.last_name}`,
      `Added lead ${data.first_name} ${data.last_name}`
    );
  };

  const handleDelete = async (lead: LeadAndClient, team: number) => {
    return await toast.handleDisplayBanner(
      deleteLead({ lead: lead.id, team }),
      `Deleting lead ${lead.first_name} ${lead.last_name}`,
      `Deleted lead ${lead.first_name} ${lead.last_name}`
    );
  };

  const handleEdit = async (
    lead: number,
    team: number,
    data: LeadAndClientValues
  ) => {
    return await toast.handleDisplayBanner(
      editLead({ lead, team, data }),
      `Updating lead ${data.first_name} ${data.last_name}`,
      `Updated lead ${data.first_name} ${data.last_name}`
    );
  };

  const handleConvertToClient = async (lead: LeadAndClient, team: number) => {
    await toast.handleDisplayBanner(
      convertLeadToClient({
        lead: lead.id,
        team,
      }),
      `Converting lead ${lead.first_name} ${lead.last_name}`,
      `Converted lead ${lead.first_name} ${lead.last_name}`
    );

    navigate("/clients");
  };

  return {
    handleAdd,
    handleDelete,
    handleEdit,
    handleConvertToClient,
  };
};
