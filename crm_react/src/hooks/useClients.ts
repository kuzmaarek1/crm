import { useToast } from "hooks/useToast";
import {
  useCreateClientMutation,
  useEditClientMutation,
  useDeleteClientMutation,
} from "reducers/clientsApiSlice";
import type { LeadAndClientValues, LeadAndClient } from "types";

export const useClients = () => {
  const toast = useToast();
  const [createClient] = useCreateClientMutation();
  const [editClient] = useEditClientMutation();
  const [deleteClient] = useDeleteClientMutation();

  const handleAdd = async (id: number, data: LeadAndClientValues) => {
    return await toast.handleDisplayBanner(
      createClient({ id, data }),
      `Adding client ${data.first_name} ${data.last_name}`,
      `Added client ${data.first_name} ${data.last_name}`
    );
  };

  const handleDelete = async (client: LeadAndClient, team: number) => {
    return await toast.handleDisplayBanner(
      deleteClient({ client: client.id, team }),
      `Deleting client ${client.first_name} ${client.last_name}`,
      `Deleted client ${client.first_name} ${client.last_name}`
    );
  };

  const handleEdit = async (
    client: number,
    team: number,
    data: LeadAndClientValues
  ) => {
    return await toast.handleDisplayBanner(
      editClient({ client, team, data }),
      `Updating client ${data.first_name} ${data.last_name}`,
      `Updated client ${data.first_name} ${data.last_name}`
    );
  };

  return {
    handleAdd,
    handleDelete,
    handleEdit,
  };
};
