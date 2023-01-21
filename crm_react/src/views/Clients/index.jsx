import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useClients } from "hooks/useClients.js";
import { clientsApiSlice } from "reducers/clientsApiSlice";
import { List } from "components";

const Clients = () => {
  const client = useClients();
  const dispatch = useDispatch();
  const teams = useSelector((state) => state.teams);
  const { watch, register, setFocus } = useForm();
  const [fetchingSearchClients, setFetchingSearchClients] = useState(false);

  useEffect(() => {
    dispatch(
      endpoint.util.prefetch(`getClients`, teams.currentTeam.id, {
        force: true,
      })
    );
  }, []);

  const { data: clients, isFetching: fetchingClients } =
    clientsApiSlice.endpoints.getClients.useQueryState(teams.currentTeam.id);

  const { data: clientsBySearch, isFetching: fetchingSearch } =
    clientsApiSlice.endpoints.searchClient.useQueryState({
      team: teams.currentTeam.id,
      name: watch("client-search"),
    });

  const endpoint = clientsApiSlice;

  useEffect(() => {
    if (fetchingSearch === true) {
      setFetchingSearchClients(true);
    } else if (
      clients?.length === clientsBySearch?.length &&
      fetchingSearchClients === true
    ) {
      setFetchingSearchClients(false);
    }
  }, [clients, fetchingSearch]);

  return (
    <List
      header="Client"
      hook={client}
      data={clients}
      fetchingData={fetchingClients}
      fetchingSearchData={fetchingSearchClients}
      endpoint={endpoint}
      register={register}
      setFocus={setFocus}
    />
  );
};

export default Clients;
