import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentTeam } from "reducers/teams.js";
import { getTeams, searchTeams } from "actions/teams.js";

import {
  useAddMemberMutation,
  useAddTeamMutation,
  useDeleteTeamMutation,
} from "reducers/teamsApiSlice";
import { deleteTeamSuccess, addMemberSuccess } from "reducers/teams.js";

export const useTeams = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [addMember] = useAddMemberMutation();
  const [addTeam] = useAddTeamMutation();
  const [deleteTeam] = useDeleteTeamMutation();

  const handleAddTeam = async (formData) => {
    try {
      await addTeam(formData);
      navigate("/teams");
    } catch (e) {
      console.log(e);
    }
  };

  const handleDeleteTeam = async (id) => {
    try {
      await deleteTeam(id);
      dispatch(deleteTeamSuccess({ data: id }));
    } catch (e) {
      console.log(e);
    }
  };

  const handleAddMember = async (request, id) => {
    const { username } = request;
    try {
      console.log({ id, username });
      const user = await addMember({ id, username });
      console.log(user);
      dispatch(addMemberSuccess({ data: { user: user.data, id: id } }));
    } catch (e) {
      console.log(e);
      alert("Don't add member ");
    }
  };

  const handleChangeTeams = (team) => {
    dispatch(setCurrentTeam({ data: team }));
  };

  const handleSearchTeams = (name) => {
    name ? dispatch(searchTeams(name)) : dispatch(getTeams());
  };

  return {
    handleAddTeam,
    handleChangeTeams,
    handleSearchTeams,
    handleDeleteTeam,
    handleAddMember,
  };
};
