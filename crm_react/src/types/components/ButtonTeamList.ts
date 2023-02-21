import type { Team, HookTeam, CurrentTeamState } from "types";

export type ButtonTeamListProps = {
  id: number;
  teams: CurrentTeamState;
  hook: HookTeam;
  props: Team;
  openModal: () => void;
  valueData: string;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};
