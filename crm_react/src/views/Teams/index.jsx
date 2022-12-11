import React from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useTeams } from "hooks/useTeams.js";
import { useGetTeamsQuery, teamsApiSlice } from "reducers/teamsApiSlice";
import { List } from "components";

const Teams = () => {
  const team = useTeams();
  const teamsState = useSelector((state) => state.teams);
  const { register, watch } = useForm();

  const {
    data: teams,
    isFetching: fetchingTeams,
    refetch: refetchTeams,
  } = useGetTeamsQuery();

  const { isFetching: fetchingSearchTeams } =
    teamsApiSlice.endpoints.searchTeam.useQueryState({
      team: teamsState.currentTeam.id,
      name: watch("team-name"),
    });

  const endpoint = teamsApiSlice;

  return (
    <List
      header="Team"
      hook={team}
      data={teams}
      fetchingData={fetchingTeams}
      fetchingSearchData={fetchingSearchTeams}
      refetchList={refetchTeams}
      endpoint={endpoint}
      register={register}
    />
  );
};

export default Teams;
