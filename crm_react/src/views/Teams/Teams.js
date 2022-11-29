import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  TeamsWrapper,
  TeamTitle,
  TeamHeader,
  TeamLink,
  TeamWrapper,
  TeamModal,
  ModalButton,
  ModalWrapper,
  ModalTeamWrapper,
  TeamForm,
  TeamInput,
  TeamLinkDiv,
} from "./Teams.styles.js";
import { useTeams } from "hooks/useTeams.js";
import { Button } from "components/Button/Button.js";
import { useSelector, useDispatch } from "react-redux";
import { getTeams } from "actions/team.js";

const Teams = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth.authData);
  const teams = useSelector((state) => state.teams);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [team, setTeam] = useState([]);
  const teamsHook = useTeams();

  useEffect(() => {
    dispatch(getTeams(null));
  }, []);

  const openModal = (id) => {
    setIsOpen(true);
    const teamFindById = teams.teamsData.find((team) => team.id === id);
    setTeam(teamFindById);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <TeamsWrapper>
      <TeamTitle>
        <TeamHeader>Team</TeamHeader>
        <TeamForm>
          <TeamInput type="serach" placeholder="Search by name" />
        </TeamForm>
        <TeamLinkDiv>
          <TeamLink to="/add-team">Add Teams</TeamLink>
        </TeamLinkDiv>
      </TeamTitle>
      <TeamWrapper title>
        <div>Name</div>
      </TeamWrapper>
      {teams?.teamsData?.map((team) => (
        <TeamWrapper onClick={() => openModal(team.id)}>
          <div>{team.name}</div>
          {String(team.id) === String(teams.currentTeam?.id) ? (
            <Button team red>
              Current
            </Button>
          ) : (
            <Button
              team
              onClick={(e) => {
                e.stopPropagation();
                teamsHook.handleChangeTeams(team);
              }}
            >
              Activate
            </Button>
          )}
        </TeamWrapper>
      ))}

      <TeamModal isOpen={modalIsOpen} onRequestClose={closeModal}>
        {team?.members &&
          String(team?.members[0]?.id) === String(auth?.user.id) && (
            <>
              <ModalButton>
                <Button to={`/add-member/${team.id}`} as={NavLink} lead>
                  Add member
                </Button>
                <Button red>Delete</Button>
              </ModalButton>
            </>
          )}
        <ModalWrapper>
          <ModalTeamWrapper title>Name</ModalTeamWrapper>
          <ModalTeamWrapper>{team.name}</ModalTeamWrapper>
          <ModalTeamWrapper title description>
            Description
          </ModalTeamWrapper>
          <ModalTeamWrapper description>{team.description}</ModalTeamWrapper>
          {team.members?.map((member) => (
            <>
              <ModalTeamWrapper title>Member</ModalTeamWrapper>
              <ModalTeamWrapper>{member.username}</ModalTeamWrapper>
            </>
          ))}
        </ModalWrapper>
      </TeamModal>
    </TeamsWrapper>
  );
};

export default Teams;
