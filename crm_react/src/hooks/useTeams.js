import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentTeam } from "reducers/teams.js";
import {
  getTeams,
  searchTeams,
  deleteTeam,
  addTeam,
  addMember,
} from "actions/teams.js";

export const useTeams = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAddTeam = (data) => {
    dispatch(addTeam(data, navigate));
  };

  const handleChangeTeams = (team) => {
    dispatch(setCurrentTeam({ data: team }));
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
