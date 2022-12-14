import { useNavigate } from "react-router-dom";
import { useToast } from "hooks/useToast";
import {
  useCreateClientMutation,
  useEditClientMutation,
  useDeleteClientMutation,
} from "reducers/clientsApiSlice";

export const useClients = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [createClient] = useCreateClientMutation();
  const [editClient] = useEditClientMutation();
  const [deleteClient] = useDeleteClientMutation();

  const handleAdd = (id, data) => {
    toast.handleDisplayBanner(
      createClient({ id, data }),
      `Adding client ${data.first_name} ${data.last_name}`,
      `Added client  ${data.first_name} ${data.last_name}`
    );
    navigate("/clients");
  };

  const handleDelete = (client, team) => {
    toast.handleDisplayBanner(
      deleteClient({ client: client.id, team }),
      `Deleting client ${client.first_name} ${client.last_name}`,
      `Deleted client  ${client.first_name} ${client.last_name}`
    );
  };

  const handleEdit = (client, team, data) => {
    toast.handleDisplayBanner(
      editClient({ client, team, data }),
      `Updating client ${data.first_name} ${data.last_name}`,
      `Updated client  ${data.first_name} ${data.last_name}`
    );
    navigate("/clients");
  };

  return {
    handleAdd,
    handleDelete,
    handleEdit,
  };
};
