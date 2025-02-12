import { useToast } from "hooks/useToast";
import {
  useCreateClientMutation,
  useEditClientMutation,
  useDeleteClientMutation,
} from "reducers/clientsApiSlice";

export const useClients = () => {
  const toast = useToast();
  const [createClient] = useCreateClientMutation();
  const [editClient] = useEditClientMutation();
  const [deleteClient] = useDeleteClientMutation();

  const handleAdd = async (id, data) => {
    return await toast.handleDisplayBanner(
      createClient({ id, data }),
      `Adding client ${data.first_name} ${data.last_name}`,
      `Added client ${data.first_name} ${data.last_name}`
    );
  };

  const handleDelete = async (client, team) => {
    return await toast.handleDisplayBanner(
      deleteClient({ client: client.id, team }),
      `Deleting client ${client.first_name} ${client.last_name}`,
      `Deleted client ${client.first_name} ${client.last_name}`
    );
  };

  const handleEdit = async (client, team, data) => {
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
