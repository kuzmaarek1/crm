import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import * as api from "api";

export const useClients = () => {
  const navigate = useNavigate();
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
  return {
    getClients,
    addClient,
    editClient,
    deleteClient,
    getClientById,
    searchClient,
  };
};
