import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { Button } from "components/Button/Button.js";
import { useTeams } from "hooks/useTeams.js";
import { useGetTeamsQuery, teamsApiSlice } from "reducers/teamsApiSlice";
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
  TeamInputWrapper,
  TeamInput,
  TeamLinkDiv,
} from "./Teams.styles.js";

const Teams = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth.authData);
  const teamsState = useSelector((state) => state.teams);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [team, setTeam] = useState([]);
  const teamsHook = useTeams();
  const { register } = useForm();
  const {
    data: teams,
    isLoading: loadingTeams,
    refetch: refetchTeams,
  } = useGetTeamsQuery();

  const openModal = (id) => {
    setModalIsOpen(true);
    const teamFindById = teams?.find((team) => team.id === id);
    setTeam(teamFindById);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <TeamsWrapper>
      <TeamTitle>
        <TeamHeader>Team</TeamHeader>
        <TeamInputWrapper>
          <TeamInput
            type="serach"
            placeholder="Search by name"
            {...register("name", {
              required: true,
              onChange: (e) => {
                if (e.target.value === "") {
                  refetchTeams();
                } else {
                  dispatch(
                    teamsApiSlice.util.prefetch("searchTeam", e.target.value, {
                      force: true,
                    })
                  );
                }
              },
            })}
          />
        </TeamInputWrapper>
        <TeamLinkDiv>
          <TeamLink to="/add-team">Add Teams</TeamLink>
        </TeamLinkDiv>
      </TeamTitle>
      <TeamWrapper title="true">
        <div>Name</div>
      </TeamWrapper>
      {loadingTeams ? (
        <div>isLoading</div>
      ) : (
        <>
          {teams?.map((team) => (
            <TeamWrapper onClick={() => openModal(team.id)} key={team.id}>
              <div>{team.name}</div>
              {String(team.id) === String(teamsState.currentTeam?.id) ? (
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
            {String(team?.created_by?.id) === String(auth?.user.id) && (
              <>
                <ModalButton>
                  <Button
                    to={`/add-member/${team.id}`}
                    as={NavLink}
                    lead="true"
                  >
                    Add member
                  </Button>
                  <Button
                    red
                    onClick={() => {
                      teamsHook.handleDeleteTeam(team, teams);
                      setModalIsOpen(false);
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
              <ModalTeamWrapper description>
                {team.description}
              </ModalTeamWrapper>
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
        </>
      )}
    </TeamsWrapper>
  );
};

export default Teams;
