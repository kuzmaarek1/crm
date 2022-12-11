import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { useToast } from "hooks/useToast";
import { setCurrentTeam } from "reducers/teams.js";
import {
  useAddMemberMutation,
  useAddTeamMutation,
  useDeleteTeamMutation,
} from "reducers/teamsApiSlice";

export const useTeams = () => {
  const dispatch = useDispatch();
  const toastHook = useToast();
  const [addMember] = useAddMemberMutation();
  const [addTeam] = useAddTeamMutation();
  const [deleteTeam] = useDeleteTeamMutation();

  const handleAdd = (team, data) => {
    toastHook.handleDisplayBanner(
      addTeam(data),
      `Adding team ${data.name}`,
      `Added team ${data.name}`
    );
  };

  const handleDelete = (team, teams) => {
    toastHook.handleDisplayBanner(
      deleteTeam({ id: team.id, teams }),
      `Deleting Team ${team.name}`,
      `Deleted Team ${team.name}`
    );
  };

  const handleAddMember = (id, request) => {
    const { username } = request;
    toastHook.handleDisplayBanner(
      addMember({ id, username }),
      `Adding member ${username}`,
      `Add member ${username}`
    );
  };

  const handleChangeTeams = (team) => {
    dispatch(setCurrentTeam({ data: team }));
    toast.success(`Change team ${team.name}`);
  };

  return {
    handleAdd,
    handleChangeTeams,
    handleDelete,
    handleAddMember,
  };
};
