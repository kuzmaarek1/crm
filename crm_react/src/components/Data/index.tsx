import React, { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "types/hooks";
import { useForm, Path } from "react-hook-form";
import { List } from "components";
import type { InputNameSearch } from "types";
import type { DataProps } from "types/components/Data";

const Data = <H, T extends { useQueryState: any }>({
  header,
  hook,
  endpoint,
  getEndpoint,
  searchEndpoint,
}: DataProps<H, T>) => {
  const [page, setPage] = useState<number>(1);
  const dispatch = useAppDispatch();
  const teamsState = useAppSelector((state) => state.teams);
  const { register, watch, setFocus, resetField } = useForm<InputNameSearch>();
  const [fetchingSearchData, setFetchingSearchData] = useState<boolean>(false);

  useEffect(() => {
    dispatch(endpoint.util.resetApiState());
  }, []);

  useEffect(() => {
    if (page === 0) {
      setPage(1);
      return;
    }
    if (!watch(`${header.toLowerCase()}-search` as Path<InputNameSearch>))
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
            name: watch(
              `${header.toLowerCase()}-search` as Path<InputNameSearch>
            ),
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
      name: watch(`${header.toLowerCase()}-search` as Path<InputNameSearch>),
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
    <List<H, InputNameSearch>
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
