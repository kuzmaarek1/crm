import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const useLeads = () => {
const navigate = useNavigate();
const getLeads = useCallback(async () => {
    try {
      const result = await axios.get(`http://127.0.0.1:8000/api/leads/`);
      return result.data;
    } catch (e) {
      console.log(e);
    }
  }, []);
  const getLeadById = useCallback(async (id) => {
    try {
      const result = await axios.get(`http://127.0.0.1:8000/api/leads/${id}/`);
      return result.data;
    } catch (e) {
      console.log(e);
    }
  }, []);
  const addLead = async ({first_name, last_name, email, phone}) => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/leads/", {
        first_name,
        last_name,
        email,
        phone,
      });
    navigate('/leads');
    }
    catch (e) {
      console.log(e);
    }
  }
  const editLead = async ({first_name, last_name, email, phone},id) => {
    try {
      const response = await axios.patch(`http://127.0.0.1:8000/api/leads/${id}/`, {
        first_name,
        last_name,
        email,
        phone,
      });
    navigate('/leads');
    }
    catch (e) {
      console.log(e);
    }
  }
  const deleteLead = async (id) => {
    console.log(id);
    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/leads/delete_lead/${id}/`);
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