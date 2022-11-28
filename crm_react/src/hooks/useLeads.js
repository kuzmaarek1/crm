import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import * as api from "api";

export const useLeads = () => {
  const navigate = useNavigate();
  const getLeads = useCallback(async (id) => {
    try {
      const result = await api.getLead(id);
      return result.data;
    } catch (e) {
      console.log(e);
    }
  }, []);
  const getLeadById = useCallback(async (lead, team) => {
    try {
      const result = await api.getLeadById(lead, team);
      return result.data;
    } catch (e) {
      console.log(e);
    }
  }, []);
  const addLead = async (
    { first_name, last_name, email, phone, description },
    id
  ) => {
    try {
      await api.createLead(id, {
        first_name,
        last_name,
        email,
        phone,
        description,
      });
      navigate("/leads");
    } catch (e) {
      console.log(e);
    }
  };
  const editLead = async (
    { first_name, last_name, email, phone, description, assigned_to },
    lead,
    team
  ) => {
    try {
      await api.editLead(lead, team, {
        first_name,
        last_name,
        email,
        phone,
        description,
        assigned_to,
      });
      navigate("/leads");
    } catch (e) {
      console.log(e);
    }
  };
  const searchLead = async (name, team) => {
    if (!name)
      try {
        return await getLeads(team);
      } catch (e) {
        console.log(e);
      }
    else
      try {
        const response = await api.searchLead(team, name);
        return response.data;
      } catch (e) {
        console.log(e);
      }
  };
  const deleteLead = async (lead, team) => {
    try {
      await api.deleteLead(lead, team);
      navigate("/leads");
    } catch (e) {
      console.log(e);
    }
  };
  const convert = async (lead, team) => {
    try {
      await api.convetLeadToClient(lead, team);
    } catch (e) {
      console.log(e);
    }
  };
  return {
    getLeads,
    addLead,
    editLead,
    deleteLead,
    getLeadById,
    searchLead,
    convert,
  };
};
