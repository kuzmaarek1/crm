import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
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
  ModalTeamMember,
  TeamForm,
  TeamInput,
  TeamLinkDiv,
} from "./Teams.styles.js";
import { useTeams } from "hooks/useTeams.js";
import { Button } from "components/Button/Button.js";
import { getTeams } from "actions/team.js";

const Teams = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth.authData);
  const teams = useSelector((state) => state.teams);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [team, setTeam] = useState([]);
  const teamsHook = useTeams();
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    dispatch(getTeams());
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
        <TeamForm
          onSubmit={handleSubmit(({ name }) => {
            teamsHook.handleSearchTeams(name);
          })}
        >
          <TeamInput
            type="serach"
            placeholder="Search by name"
            {...register("name", {
              required: true,
              onChange: (e) => {
                teamsHook.handleSearchTeams(e.target.value);
              },
            })}
          />
        </TeamForm>
        <TeamLinkDiv>
          <TeamLink to="/add-team">Add Teams</TeamLink>
        </TeamLinkDiv>
      </TeamTitle>
      <TeamWrapper title="true">
        <div>Name</div>
      </TeamWrapper>
      {teams?.teamsData?.map((team) => (
        <TeamWrapper onClick={() => openModal(team.id)} key={team.id}>
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

      <TeamModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        ariaHideApp={false}
      >
        {team?.members &&
          String(team?.members[0]?.id) === String(auth?.user.id) && (
            <>
              <ModalButton>
                <Button to={`/add-member/${team.id}`} as={NavLink} lead="true">
                  Add member
                </Button>
                <Button
                  red
                  onClick={() => {
                    teamsHook.handleDeleteTeam(team.id);
                    setIsOpen(false);
                  }}
                >
                  Delete
                </Button>
              </ModalButton>
            </>
          )}
        <ModalWrapper>
          <ModalTeamWrapper title="true">Name</ModalTeamWrapper>
          <ModalTeamWrapper>{team.name}</ModalTeamWrapper>
          <ModalTeamWrapper title="true" description>
            Description
          </ModalTeamWrapper>
          <ModalTeamWrapper description>{team.description}</ModalTeamWrapper>
          {team.members?.map((member) => (
            <ModalTeamMember key={member.id}>
              <ModalTeamWrapper title="true" member>
                Member
              </ModalTeamWrapper>
              <ModalTeamWrapper member>{member.username}</ModalTeamWrapper>
            </ModalTeamMember>
          ))}
        </ModalWrapper>
      </TeamModal>
    </TeamsWrapper>
  );
};

export default Teams;
