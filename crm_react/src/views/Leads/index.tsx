import React from "react";
import { Data } from "components";
import { useLeads } from "hooks/useLeads";
import { leadsApiSlice } from "reducers/leadsApiSlice";

const Leads = () => {
  const lead = useLeads();
  const endpoint = leadsApiSlice;
  const getEndpoint = leadsApiSlice.endpoints.getLeads;
  const searchEndpoint = leadsApiSlice.endpoints.searchLead;
  return (
    <Data<"L", any>
      header="Lead"
      hook={lead}
      endpoint={endpoint}
      getEndpoint={getEndpoint}
      searchEndpoint={searchEndpoint}
    />
  );
};

export default Leads;
