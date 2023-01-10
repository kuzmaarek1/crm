import React from "react";
import { Button } from "components";
import * as Styles from "./styles";

const ButtonTeamList = ({ id, teams, hook, props, openModal, valueData }) => {
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
