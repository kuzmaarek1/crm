import React from "react";
import { Data } from "components";
import { useTeams } from "hooks/useTeams.js";
import { teamsApiSlice } from "reducers/teamsApiSlice";

const Teams = () => {
  const team = useTeams();
  const endpoint = teamsApiSlice;
  const getEndpoint = teamsApiSlice.endpoints.getTeams;
  const searchEndpoint = teamsApiSlice.endpoints.searchTeam;
  return (
    <Data
      header="Team"
      hook={team}
      endpoint={endpoint}
      getEndpoint={getEndpoint}
      searchEndpoint={searchEndpoint}
    />
  );
};

export default Teams;
