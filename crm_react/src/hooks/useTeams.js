import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  getTeams,
  searchTeams,
  deleteTeam,
  addTeam,
  addMember,
} from "actions/teams.js";
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

  const handleAddMember = (request, id) => {
    dispatch(addMember(request, id));
  };

  return {
    handleAddTeam,
    handleChangeTeams,
    handleSearchTeams,
    handleDeleteTeam,
    handleAddMember,
  };
};
