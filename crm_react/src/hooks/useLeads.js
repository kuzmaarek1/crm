import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const useLeads = () => {
const navigate = useNavigate();
const getLeads = useCallback(async (id) => {
    try {
      const result = await axios.get(`http://127.0.0.1:8000/api/leads/get_lead/${id}/`);
      return result.data;
    } catch (e) {
      console.log(e);
    }
  }, []);
  const getLeadById = useCallback(async (id_lead, id_team) => {
    console.log (id_team);
    try {
      const result = await axios.get(`http://127.0.0.1:8000/api/leads/get_lead_by_id/${id_lead}/${id_team}/`);
      return result.data;
    } catch (e) {
      console.log(e);
    }
  }, []);
  const addLead = async ({first_name, last_name, email, phone, description},id) => {
    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/leads/create_lead/${id}/`, {
        first_name,
        last_name,
        email,
        phone,
        description,
      });
    navigate('/leads');
    }
    catch (e) {
      console.log(e);
    }
  }
  const editLead = async ({first_name, last_name, email, phone, description, assigned_to},id_lead, id_team) => {
    console.log(assigned_to);
    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/leads/update_lead/${id_lead}/${id_team}/`, {
        first_name,
        last_name,
        email,
        phone,
        description,
        assigned_to
      });
    navigate('/leads');
    }
    catch (e) {
      console.log(e);
    }
  }
  const deleteLead = async (id_lead, id_team) => {
    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/leads/delete_lead/${id_lead}/${id_team}/`);
      navigate('/leads');
    }
    catch (e) {
      console.log(e);
    }
  }
  return {
    getLeads,
    addLead,
    editLead,
    deleteLead,
    getLeadById,
  };
}