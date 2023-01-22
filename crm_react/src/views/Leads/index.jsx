import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useLeads } from "hooks/useLeads.js";
import { leadsApiSlice } from "reducers/leadsApiSlice";
import { List } from "components";

const Leads = () => {
  const lead = useLeads();
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const teams = useSelector((state) => state.teams);
  const { register, watch, setFocus } = useForm();
  const [fetchingSearchLeads, setFetchingSearchLeads] = useState(false);

  useEffect(() => {
    if (watch("lead-search") === "" || watch("lead-search") === undefined)
      dispatch(
        endpoint.util.prefetch(
          `getLeads`,
          { id: teams.currentTeam.id, page: page },
          {
            force: true,
          }
        )
      );
    else
      dispatch(
        endpoint.util.prefetch(
          `searchLead`,
          {
            team: teams.currentTeam.id,
            name: watch("lead-search"),
            page: page,
          },
          {
            force: true,
          }
        )
      );
  }, [page]);

  const { data: leads, isFetching: fetchingLeads } =
    leadsApiSlice.endpoints.getLeads.useQueryState({
      id: teams.currentTeam.id,
      page: page,
    });

  const { data: leadsBySearch, isFetching: fetchingSearch } =
    leadsApiSlice.endpoints.searchLead.useQueryState({
      team: teams.currentTeam.id,
      name: watch("lead-search"),
      page: page,
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

  const handleClickButton = () => {
    if (leads.has_next) setPage((prevState) => prevState + 1);
  };

  return (
    <>
      <button onClick={handleClickButton}>Więcej</button>
      <List
        header="Lead"
        hook={lead}
        data={leads}
        fetchingData={fetchingLeads}
        fetchingSearchData={fetchingSearchLeads}
        endpoint={endpoint}
        register={register}
        setFocus={setFocus}
        page={page}
        setPage={setPage}
      />
    </>
  );
};

export default Leads;
