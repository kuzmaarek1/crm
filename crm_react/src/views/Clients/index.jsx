import React from "react";
import { Data } from "components";
import { useClients } from "hooks/useClients.js";
import { clientsApiSlice } from "reducers/clientsApiSlice";

const Clients = () => {
  const client = useClients();
  const endpoint = clientsApiSlice;
  const getEndpoint = clientsApiSlice.endpoints.getClients;
  const searchEndpoint = clientsApiSlice.endpoints.searchClient;
  return (
    <Data
      header="Client"
      hook={client}
      endpoint={endpoint}
      getEndpoint={getEndpoint}
      searchEndpoint={searchEndpoint}
    />
  );
};

export default Clients;
