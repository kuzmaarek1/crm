import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useTeams } from "hooks/useTeams.js";
import { teamsApiSlice } from "reducers/teamsApiSlice";
import { List } from "components";

const Teams = () => {
  const team = useTeams();
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const teamsState = useSelector((state) => state.teams);
  const { register, watch, setFocus } = useForm();
  const [fetchingSearchTeams, setFetchingSearchTeams] = useState(false);

  useEffect(() => {
    if (watch("team-search") === "" || watch("team-search") === undefined)
      dispatch(
        endpoint.util.prefetch(
          `getTeams`,
          { page: page },
          {
            force: true,
          }
        )
      );
    else
      dispatch(
        endpoint.util.prefetch(
          `searchTeam`,
          {
            team: teams?.currentTeam?.id,
            name: watch("team-search"),
            page: page,
          },
          {
            force: true,
          }
        )
      );
  }, [page]);

  const { data: teams, isFetching: fetchingTeams } =
    teamsApiSlice.endpoints.getTeams.useQueryState({ page: page });

  const { data: teamsBySearch, isFetching: fetchingSearch } =
    teamsApiSlice.endpoints.searchTeam.useQueryState({
      team: teamsState?.currentTeam?.id,
      name: watch("team-search"),
      page: page,
    });

  const endpoint = teamsApiSlice;

  useEffect(() => {
    if (fetchingSearch === true) {
      setFetchingSearchTeams(true);
    } else if (
      teams?.length === teamsBySearch?.length &&
      fetchingSearchTeams === true
    ) {
      setFetchingSearchTeams(false);
    }
  }, [teams, fetchingSearch]);

  const handleClickButton = () => {
    if (teams.has_next) setPage((prevState) => prevState + 1);
  };

  return (
    <>
      <button onClick={handleClickButton}>Więcej</button>
      <List
        header="Team"
        hook={team}
        data={teams}
        fetchingData={fetchingTeams}
        fetchingSearchData={fetchingSearchTeams}
        setFocus={setFocus}
        endpoint={endpoint}
        register={register}
        page={page}
        setPage={setPage}
      />
    </>
  );
};

export default Teams;
