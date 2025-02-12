import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { useToast } from "hooks/useToast";
import { setCurrentTeam } from "reducers/teams.js";
import {
  useAddMemberMutation,
  useAddTeamMutation,
  useDeleteTeamMutation,
  useEditTeamMutation,
} from "reducers/teamsApiSlice";

export const useTeams = () => {
  const dispatch = useDispatch();
  const toastHook = useToast();
  const [addMember] = useAddMemberMutation();
  const [addTeam] = useAddTeamMutation();
  const [deleteTeam] = useDeleteTeamMutation();
  const [editTeam] = useEditTeamMutation();

  const handleAdd = async (team, data) => {
    return await toastHook.handleDisplayBanner(
      addTeam(data),
      `Adding team ${data.name}`,
      `Added team ${data.name}`
    );
  };

  const handleDelete = async (team, teams) => {
    return await toastHook.handleDisplayBanner(
      deleteTeam({ id: team.id, teams }),
      `Deleting Team ${team.name}`,
      `Deleted Team ${team.name}`
    );
  };

  const handleAddMember = async (id, request) => {
    const { username } = request;
    return await toastHook.handleDisplayBanner(
      addMember({ id, username }),
      `Adding member ${username}`,
      `Added member ${username}`
    );
  };

  const handleChangeTeams = (team) => {
    dispatch(setCurrentTeam({ data: team }));
    toast.success(`Changed team ${team.name}`);
  };

  const handleEdit = async (id, team, data) => {
    return await toastHook.handleDisplayBanner(
      editTeam({ id, data }),
      `Updating team ${data.name}`,
      `Updated team ${data.name}`
    );
  };

  return {
    handleAdd,
    handleChangeTeams,
    handleDelete,
    handleEdit,
    handleAddMember,
  };
};
