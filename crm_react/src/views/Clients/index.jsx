import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useClients } from "hooks/useClients.js";
import { clientsApiSlice } from "reducers/clientsApiSlice";
import { List } from "components";

const Clients = () => {
  const client = useClients();
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const teams = useSelector((state) => state.teams);
  const { watch, register, setFocus } = useForm();
  const [fetchingSearchClients, setFetchingSearchClients] = useState(false);

  useEffect(() => {
    dispatch(clientsApiSlice.util.resetApiState());
  }, []);

  useEffect(() => {
    if (watch("client-search") === "" || watch("client-search") === undefined)
      dispatch(
        endpoint.util.prefetch(
          `getClients`,
          { id: teams.currentTeam.id, page: page },
          {
            force: true,
          }
        )
      );
    else
      dispatch(
        endpoint.util.prefetch(
          `searchClient`,
          {
            team: teams.currentTeam.id,
            name: watch("client-search"),
            page: page,
          },
          {
            force: true,
          }
        )
      );
  }, [page]);

  const { data: clients, isFetching: fetchingClients } =
    clientsApiSlice.endpoints.getClients.useQueryState({
      id: teams.currentTeam.id,
      page: page,
    });

  const { data: clientsBySearch, isFetching: fetchingSearch } =
    clientsApiSlice.endpoints.searchClient.useQueryState({
      team: teams.currentTeam.id,
      name: watch("client-search"),
      page: page,
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
      page={page}
      setPage={setPage}
    />
  );
};

export default Clients;
