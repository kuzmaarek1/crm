import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { List } from "components";

const Data = ({ header, hook, endpoint, getEndpoint, searchEndpoint }) => {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const teamsState = useSelector((state) => state.teams);
  const { register, watch, setFocus, resetField } = useForm();
  const [fetchingSearchData, setFetchingSearchData] = useState(false);

  useEffect(() => {
    dispatch(endpoint.util.resetApiState());
  }, []);

  useEffect(() => {
    if (page === 0) {
      setPage(1);
      return;
    }
    if (
      watch(`${header.toLowerCase()}-search`) === "" ||
      watch(`${header.toLowerCase()}-search`) === undefined
    )
      dispatch(
        endpoint.util.prefetch(
          `get${header}s`,
          { id: teamsState.currentTeam.id, page: page },
          {
            force: true,
          }
        )
      );
    else
      dispatch(
        endpoint.util.prefetch(
          `search${header}`,
          {
            team: teamsState?.currentTeam?.id,
            name: watch(`${header.toLowerCase()}-search`),
            page: page,
          },
          {
            force: true,
          }
        )
      );
  }, [page]);

  const { data, isFetching: fetchingData } = getEndpoint.useQueryState({
    id: teamsState.currentTeam.id,
    page: page,
  });

  const { data: dataBySearch, isFetching: fetchingSearch } =
    searchEndpoint.useQueryState({
      team: teamsState?.currentTeam?.id,
      name: watch(`${header.toLowerCase()}-search`),
      page: page,
    });

  useEffect(() => {
    if (fetchingSearch === true) {
      setFetchingSearchData(true);
    } else if (
      data?.results?.length === dataBySearch?.results?.length &&
      fetchingSearchData === true
    ) {
      setFetchingSearchData(false);
    }
  }, [data, fetchingSearch]);

  return (
    <List
      header={header}
      hook={hook}
      data={data}
      fetchingData={fetchingData}
      fetchingSearchData={fetchingSearchData}
      setFocus={setFocus}
      endpoint={endpoint}
      register={register}
      page={page}
      setPage={setPage}
      resetSearch={resetField}
    />
  );
};

export default Data;
