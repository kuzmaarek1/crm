import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const useLeads = () => {
const navigate = useNavigate();
const getLeads = useCallback(async () => {
    try {
      const result = await axios.get(`http://127.0.0.1:8000/api/leads/`);
      console.log(result.data);
      return result.data;
    } catch (e) {
      console.log(e);
    }
  }, []);
  const addLoad = async ({first_name, last_name, email, phone}) => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/leads/", {
        first_name,
        last_name,
        email,
        phone,
      });
    console.log(first_name, last_name, email, phone);
    navigate('/leads');
    }
    catch (e) {
      console.log(e);
    }
  }
  return {
    getLeads,
    addLoad,
  };
}