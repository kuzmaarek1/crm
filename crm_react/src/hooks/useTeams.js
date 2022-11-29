import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as api from "api";
import { getTeams } from "actions/team.js";
import { useDispatch, useSelector } from "react-redux";
import { addTeam } from "actions/team.js";
import * as actionType from "constants/actionTypes";

export const useTeams = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAddTeam = (data) => {
    dispatch(addTeam(data, navigate));
  };

  const handleChangeTeams = (team) => {
    dispatch({ type: actionType.SET_CURRENT_TEAM, data: team });
  };

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
    handleAddTeam,
    handleChangeTeams,
    getTeams,
    getTeamsById,
    deleteTeam,
    searchTeam,
  };
};
