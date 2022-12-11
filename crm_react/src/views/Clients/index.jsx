import React from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useClients } from "hooks/useClients.js";
import { useGetClientsQuery, clientsApiSlice } from "reducers/clientsApiSlice";
import { List } from "components";

const Clients = () => {
  const client = useClients();
  const teams = useSelector((state) => state.teams);
  const { watch, register } = useForm();

  const {
    data: clients,
    isFetching: fetchingClients,
    refetch: refetchClients,
  } = useGetClientsQuery(teams.currentTeam.id);

  const { isFetching: fetchingSearchClients } =
    clientsApiSlice.endpoints.searchClient.useQueryState({
      team: teams.currentTeam.id,
      name: watch("client-name"),
    });

  const endpoint = clientsApiSlice;

  return (
    <List
      header="Client"
      hook={client}
      data={clients}
      fetchingData={fetchingClients}
      fetchingSearchData={fetchingSearchClients}
      refetchList={refetchClients}
      endpoint={endpoint}
      register={register}
    />
  );
};

export default Clients;
