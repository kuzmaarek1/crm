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

  return {
    handleAddClient,
    handleDeleteClient,
    handleSearchClients,
    handleEditClient,
  };
};
