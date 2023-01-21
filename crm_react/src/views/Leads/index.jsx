import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useLeads } from "hooks/useLeads.js";
import { leadsApiSlice } from "reducers/leadsApiSlice";
import { List } from "components";

const Leads = () => {
  const lead = useLeads();
  const dispatch = useDispatch();
  const teams = useSelector((state) => state.teams);
  const { register, watch, setFocus } = useForm();
  const [fetchingSearchLeads, setFetchingSearchLeads] = useState(false);
  useEffect(() => {
    dispatch(
      endpoint.util.prefetch(`getLeads`, teams.currentTeam.id, {
        force: true,
      })
    );
  }, []);

  const { data: leads, isFetching: fetchingLeads } =
    leadsApiSlice.endpoints.getLeads.useQueryState(teams.currentTeam.id);

  const { data: leadsBySearch, isFetching: fetchingSearch } =
    leadsApiSlice.endpoints.searchLead.useQueryState({
      team: teams.currentTeam.id,
      name: watch("lead-search"),
    });

  const endpoint = leadsApiSlice;

  useEffect(() => {
    if (fetchingSearch === true) {
      setFetchingSearchLeads(true);
    } else if (
      leads?.length === leadsBySearch?.length &&
      fetchingSearchLeads === true
    ) {
      setFetchingSearchLeads(false);
    }
  }, [leads, fetchingSearch]);

  return (
    <List
      header="Lead"
      hook={lead}
      data={leads}
      fetchingData={fetchingLeads}
      fetchingSearchData={fetchingSearchLeads}
      endpoint={endpoint}
      register={register}
      setFocus={setFocus}
    />
  );
};

export default Leads;
