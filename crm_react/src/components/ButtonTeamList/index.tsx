import React from "react";
import { Button } from "components";
import * as Styles from "./styles";
import type { Team, HookTeam, CurrentTeamState } from "types";

type ButtonTeamListProps = {
  id: number;
  teams: CurrentTeamState;
  hook: HookTeam;
  props: Team;
  openModal: () => void;
  valueData: string;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

const ButtonTeamList = ({
  id,
  teams,
  hook,
  props,
  openModal,
  valueData,
  setPage,
}: ButtonTeamListProps) => {
  const isCurrentTeam = String(id) === String(teams.currentTeam?.id);
  return (
    <Styles.ButtonWrapper onClick={openModal}>
      <Button
        team
        red={isCurrentTeam}
        width="200px"
        height="4vh"
        aria-label={valueData}
        onClick={(e) => {
          if (!isCurrentTeam) {
            e.stopPropagation();
            setPage(1);
            hook.handleChangeTeams(props);
          }
        }}
      >
        {isCurrentTeam ? "Current" : "Activate"}
      </Button>
    </Styles.ButtonWrapper>
  );
};

export default ButtonTeamList;
