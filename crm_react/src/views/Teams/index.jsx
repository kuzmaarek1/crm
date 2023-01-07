import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useTeams } from "hooks/useTeams.js";
import { teamsApiSlice } from "reducers/teamsApiSlice";
import { List } from "components";

const Teams = () => {
  const team = useTeams();
  const dispatch = useDispatch();
  const teamsState = useSelector((state) => state.teams);
  const { register, watch, setFocus } = useForm();
  const [fetchingSearchTeams, setFetchingSearchTeams] = useState(false);

  useEffect(() => {
    dispatch(
      endpoint.util.prefetch(`getTeams`, undefined, {
        force: true,
      })
    );
  }, []);

  const { data: teams, isFetching: fetchingTeams } =
    teamsApiSlice.endpoints.getTeams.useQueryState();

  const { data: teamsBySearch, isFetching: fetchingSearch } =
    teamsApiSlice.endpoints.searchTeam.useQueryState({
      team: teamsState?.currentTeam?.id,
      name: watch("team-search"),
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

  return (
    <List
      header="Team"
      hook={team}
      data={teams}
      fetchingData={fetchingTeams}
      fetchingSearchData={fetchingSearchTeams}
      setFocus={setFocus}
      endpoint={endpoint}
      register={register}
    />
  );
};

export default Teams;
