import { useNavigate } from "react-router-dom";
import {
  useCreateClientMutation,
  useEditClientMutation,
  useDeleteClientMutation,
} from "reducers/clientsApiSlice";

export const useClients = () => {
  const navigate = useNavigate();
  const [createClient] = useCreateClientMutation();
  const [editClient] = useEditClientMutation();
  const [deleteClient] = useDeleteClientMutation();

  const handleAddClient = async (id, data) => {
    try {
      await createClient({ id, data });
      navigate("/clients");
    } catch (e) {
      console.log(e);
    }
  };

  const handleDeleteClient = async (client, team) => {
    try {
      await deleteClient({ client, team });
    } catch (e) {
      console.log(e);
    }
  };

  const handleEditClient = async (client, team, data) => {
    try {
      await editClient({ client, team, data });
      navigate("/clients");
    } catch (e) {
      console.log(e);
    }
  };

  return {
    handleAddClient,
    handleDeleteClient,
    handleEditClient,
  };
};
