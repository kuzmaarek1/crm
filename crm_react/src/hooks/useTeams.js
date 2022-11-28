import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import * as api from "api";

export const useTeams = () => {
  const navigate = useNavigate();

  const addTeam = async ({ name, description }) => {
    try {
      await api.addTeam({ name, description });
      console.log("Create teams");
      navigate("/teams");
    } catch (e) {
      console.log(e);
    }
  };
  const getTeams = useCallback(async () => {
    try {
      const result = await api.getTeams();
      return result.data;
    } catch (e) {
      console.log(e);
    }
  }, []);
  const getTeamsById = useCallback(async (id) => {
    try {
      const result = await api.getTeamsById(id);
      return result.data;
    } catch (e) {
      console.log(e);
    }
  }, []);
  const deleteTeam = async (id) => {
    try {
      await api.deleteTeam(id);
      navigate("/teams");
    } catch (e) {
      console.log(e);
    }
  };
  const searchTeam = async (name) => {
    if (!name)
      try {
        return await getTeams();
      } catch (e) {
        console.log(e);
      }
    else
      try {
        const response = await api.searchTeam(name);
        return response.data;
      } catch (e) {
        console.log(e);
      }
  };
  return {
    addTeam,
    getTeams,
    getTeamsById,
    deleteTeam,
    searchTeam,
  };
};
