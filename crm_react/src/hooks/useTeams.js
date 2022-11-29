import { useNavigate } from "react-router-dom";
import { getTeams, searchTeams, deleteTeam } from "actions/team.js";
import { useDispatch } from "react-redux";
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

  const handleSearchTeams = (name) => {
    name ? dispatch(searchTeams(name)) : dispatch(getTeams());
  };

  const handleDeleteTeam = (id) => {
    dispatch(deleteTeam(id));
  };

  return {
    handleAddTeam,
    handleChangeTeams,
    handleSearchTeams,
    handleDeleteTeam,
  };
};
