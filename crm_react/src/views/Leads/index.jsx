import React from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useLeads } from "hooks/useLeads.js";
import { useGetLeadsQuery, leadsApiSlice } from "reducers/leadsApiSlice";
import { List } from "components";

const Leads = () => {
  const lead = useLeads();
  const teams = useSelector((state) => state.teams);
  const { register, watch } = useForm();

  const {
    data: leads,
    isFetching: fetchingLeads,
    refetch: refetchLeads,
  } = useGetLeadsQuery(teams.currentTeam.id);

  const { isFetching: fetchingSearchLeads } =
    leadsApiSlice.endpoints.searchLead.useQueryState({
      team: teams.currentTeam.id,
      name: watch("lead-name"),
    });

  const endpoint = leadsApiSlice;

  return (
    <List
      header="Lead"
      hook={lead}
      data={leads}
      fetchingData={fetchingLeads}
      fetchingSearchData={fetchingSearchLeads}
      refetchList={refetchLeads}
      endpoint={endpoint}
      register={register}
    />
  );
};

export default Leads;
