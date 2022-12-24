import React from "react";
import { Button } from "components";
import * as Styles from "./styles";

const ButtonTeamList = ({ id, teams, hook, props, openModal }) => (
  <Styles.ButtonWrapper onClick={openModal}>
    {String(id) === String(teams.currentTeam?.id) ? (
      <Button team red width="200px" height="4vh">
        Current
      </Button>
    ) : (
      <Button
        width="200px"
        height="4vh"
        team
        onClick={(e) => {
          e.stopPropagation();
          hook.handleChangeTeams(props);
        }}
      >
        Activate
      </Button>
    )}
  </Styles.ButtonWrapper>
);

export default ButtonTeamList;
