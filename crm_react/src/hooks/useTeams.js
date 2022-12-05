import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentTeam } from "reducers/teams.js";
import {
  useAddMemberMutation,
  useAddTeamMutation,
  useDeleteTeamMutation,
} from "reducers/teamsApiSlice";

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

  const handleDeleteTeam = async (id, teams) => {
    try {
      await deleteTeam({ id, teams });
    } catch (e) {
      console.log(e);
    }
  };

  const handleAddMember = async (request, id) => {
    const { username } = request;
    try {
      await addMember({ id, username });
    } catch (e) {
      console.log(e);
      alert("Don't add member ");
    }
  };

  const handleChangeTeams = (team) => {
    dispatch(setCurrentTeam({ data: team }));
  };

  return {
    handleAddTeam,
    handleChangeTeams,
    handleDeleteTeam,
    handleAddMember,
  };
};
