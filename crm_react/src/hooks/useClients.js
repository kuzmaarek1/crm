import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addClient,
  deleteClient,
  searchClients,
  getClients,
  editClient,
} from "actions/clients";

export const useClients = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddClient = (id, data) => {
    dispatch(addClient(id, data, navigate));
  };

  const handleDeleteClient = (client, team) => {
    dispatch(deleteClient(client, team));
  };

  const handleSearchClients = (team, name) => {
    name ? dispatch(searchClients(team, name)) : dispatch(getClients(team));
  };

  const handleEditClient = (client, team, data) => {
    dispatch(editClient(client, team, data, navigate));
  };

  /*
  const getClients = useCallback(async (id) => {
    try {
      const result = await api.getClient(id);
      return result.data;
    } catch (e) {
      console.log(e);
    }
  }, []);
  const getClientById = useCallback(async (client, team) => {
    try {
      const result = await api.getClientById(client, team);
      return result.data;
    } catch (e) {
      console.log(e);
    }
  }, []);
  const addClient = async (
    { first_name, last_name, email, phone, description },
    id
  ) => {
    try {
      await api.createClient({
        first_name,
        last_name,
        email,
        phone,
        description,
      });
      navigate("/clients");
    } catch (e) {
      console.log(e);
    }
  };
  const editClient = async (
    { first_name, last_name, email, phone, description, assigned_to },
    client,
    team
  ) => {
    try {
      await editClient(client, team, {
        first_name,
        last_name,
        email,
        phone,
        description,
        assigned_to,
      });
      navigate("/clients");
    } catch (e) {
      console.log(e);
    }
  };
  const searchClient = async (name, team) => {
    if (!name)
      try {
        return await getClients(team);
      } catch (e) {
        console.log(e);
      }
    else
      try {
        const response = await api.searchClient(team, name);
        return response.data;
      } catch (e) {
        console.log(e);
      }
  };
  const deleteClient = async (client, team) => {
    try {
      await api.deleteClient(client, team);
      navigate("/clients");
    } catch (e) {
      console.log(e);
    }
  };
  */
  return {
    handleAddClient,
    handleDeleteClient,
    handleSearchClients,
    handleEditClient,
  };
};
