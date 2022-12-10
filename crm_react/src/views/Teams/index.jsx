import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useTeams } from "hooks/useTeams.js";
import { useGetTeamsQuery, teamsApiSlice } from "reducers/teamsApiSlice";
import { Button, TableLoader } from "components";
import * as Styles from "./styles";

const Teams = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth.authData);
  const teamsState = useSelector((state) => state.teams);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [team, setTeam] = useState([]);
  const teamsHook = useTeams();
  const { register, watch } = useForm();
  const {
    data: teams,
    isFetching: fetchingTeams,
    refetch: refetchTeams,
  } = useGetTeamsQuery();

  const { isFetching: fetchingSearchTeams } =
    teamsApiSlice.endpoints.searchTeam.useQueryState(watch("name"));

  const openModal = (id) => {
    setModalIsOpen(true);
    const teamFindById = teams?.find((team) => team.id === id);
    setTeam(teamFindById);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <Styles.Wrapper>
      <Styles.Title>
        <Styles.Header>Team</Styles.Header>
        <Styles.InputWrapper>
          <Styles.Input
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
        </Styles.InputWrapper>
        <Styles.LinkWrapper>
          <Styles.Link to="/add-team">Add Teams</Styles.Link>
        </Styles.LinkWrapper>
      </Styles.Title>
      <Styles.ListWrapper title="true">
        <div>Name</div>
      </Styles.ListWrapper>
      {fetchingTeams || fetchingSearchTeams ? (
        <TableLoader />
      ) : (
        <>
          {teams?.map((team) => (
            <Styles.ListWrapper
              onClick={() => openModal(team.id)}
              key={team.id}
            >
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
            </Styles.ListWrapper>
          ))}
          <Styles.ModalWrapper
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            ariaHideApp={false}
          >
            {String(team?.created_by?.id) === String(auth?.user.id) && (
              <>
                <Styles.ButtonWrapper>
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
                </Styles.ButtonWrapper>
              </>
            )}
            <Styles.DetailsWrapper>
              <Styles.Details title="true">Name</Styles.Details>
              <Styles.Details>{team.name}</Styles.Details>
              <Styles.Details title="true" description>
                Description
              </Styles.Details>
              <Styles.Details description>{team.description}</Styles.Details>
              {team.members?.map((member) => (
                <Styles.DetailsMember key={member.id}>
                  <Styles.Details title="true" member>
                    Member
                  </Styles.Details>
                  <Styles.Details member>{member.username}</Styles.Details>
                </Styles.DetailsMember>
              ))}
            </Styles.DetailsWrapper>
          </Styles.ModalWrapper>
        </>
      )}
    </Styles.Wrapper>
  );
};

export default Teams;
