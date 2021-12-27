import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const useClients = () => {
const navigate = useNavigate();
const getClients = useCallback(async (id) => {
    try {
      const result = await axios.get(`http://127.0.0.1:8000/api/clients/get_client/${id}/`);
      return result.data;
    } catch (e) {
      console.log(e);
    }
  }, []);
  const getClientById = useCallback(async (id_client, id_team) => {
    try {
      const result = await axios.get(`http://127.0.0.1:8000/api/clients/get_client_by_id/${id_client}/${id_team}/`);
      return result.data;
    } catch (e) {
      console.log(e);
    }
  }, []);
  const addClient = async ({first_name, last_name, email, phone, description},id) => {
    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/clients/create_client/${id}/`, {
        first_name,
        last_name,
        email,
        phone,
        description,
      });
    navigate('/clients');
    }
    catch (e) {
      console.log(e);
    }
  }
  const editClient = async ({first_name, last_name, email, phone, description, assigned_to},id_client, id_team) => {
    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/clients/update_client/${id_client}/${id_team}/`, {
        first_name,
        last_name,
        email,
        phone,
        description,
        assigned_to
      });
    navigate('/clients');
    }
    catch (e) {
      console.log(e);
    }
  }
  const searchClient = async (name, id_team) => {
    if(!name) try{ return await getClients(id_team); }
    catch (e){
      console.log(e);
    }
    else 
      try{
        const response = await axios.get(`http://127.0.0.1:8000/api/clients/search_client/${id_team}/${name}/`);
        return response.data;
      }
      catch(e){
        console.log(e);
      }
  }
  const deleteClient = async (id_client, id_team) => {
    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/clients/delete_client/${id_client}/${id_team}/`);
      navigate('/clients');
    }
    catch (e) {
      console.log(e);
    }
  }
  return {
    getClients,
    addClient,
    editClient,
    deleteClient,
    getClientById,
    searchClient,
  };
}