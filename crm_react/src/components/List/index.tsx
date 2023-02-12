import React, { useState, useRef, useCallback } from "react";
import { useAppSelector } from "types/hooks";
import {
  FieldValues,
  UseFormRegister,
  UseFormSetFocus,
  UseFormResetField,
} from "react-hook-form";
import {
  TableLoader,
  ModalDetails,
  ModalForm,
  HeaderList,
  TableRow,
  ButtonTeamList,
  Loader,
} from "components";
import type {
  HookTeam,
  HookLead,
  HookClient,
  TeamData,
  LeadAndClientData,
  Team,
  LeadAndClient,
} from "types";
import * as Styles from "./styles";

type ListProps<H, TFieldValues extends FieldValues> = {
  header: H extends "C" ? "Client" : H extends "L" ? "Lead" : "Team";
  hook: H extends "C" ? HookClient : H extends "L" ? HookLead : HookTeam;
  data?: H extends "T" ? TeamData : LeadAndClientData;
  fetchingData: boolean;
  fetchingSearchData: boolean;
  endpoint: {
    endpoints: H extends "C"
      ? { getClients: any } & { searchClient: any }
      : H extends "L"
      ? { getLeads: any } & { searchLead: any }
      : { getTeams: any } & { searchTeam: any };
    util: any;
  };
  register: UseFormRegister<TFieldValues>;
  setFocus: UseFormSetFocus<TFieldValues>;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  resetSearch: UseFormResetField<TFieldValues>;
};

const List = <H, TFieldValues extends FieldValues>({
  header,
  hook,
  data,
  fetchingData,
  fetchingSearchData,
  endpoint,
  register,
  setFocus,
  page,
  setPage,
  resetSearch,
}: ListProps<H, TFieldValues>) => {
  const intObserver = useRef<IntersectionObserver | null>();
  const lastRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (fetchingData || fetchingSearchData) return;

      if (intObserver.current) intObserver.current.disconnect();

      intObserver.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && data?.has_next) {
          setPage((prev) => prev + 1);
        }
      });

      if (node) intObserver.current.observe(node);
    },
    [fetchingData, fetchingSearchData, data?.has_next]
  );

  const teams = useAppSelector((state) => state.teams);
  const [modalIsOpenDetails, setModalIsOpenDetails] = useState<boolean>(false);
  const [modalIsOpenFormAdd, setModalIsOpenFormAdd] = useState(false);
  const [list, setList] = useState<H extends "T" ? Team : LeadAndClient>();
  let objectKey = null;
  const openModal = (dataId: number) => {
    setModalIsOpenDetails(true);
    const dataFindById = (
      data?.results as Array<H extends "T" ? Team : LeadAndClient>
    )?.find(({ id }: { id: number }) => id === dataId);
    setList(dataFindById);
  };

  if (data?.results !== undefined && data?.results?.length !== 0) {
    let { id, created_by, description, members, ...otherData } =
      data.results[0];
    objectKey = otherData;
  }

  return (
    <Styles.Wrapper id="list_conatainer">
      <HeaderList<H, TFieldValues>
        header={header}
        register={register}
        setFocus={setFocus}
        setModalIsOpenFormAdd={setModalIsOpenFormAdd}
        setPage={setPage}
      />
      {(fetchingData || fetchingSearchData) && page === 1 ? (
        <TableLoader />
      ) : (
        <Styles.ListWrapper team={header === "Team"}>
          {objectKey &&
            Object.entries(objectKey).map(([key], index) => {
              let description = `${key[0].toUpperCase()}${key
                .slice(1)
                .replace("_", " ")}`;
              return (
                <TableRow<H>
                  header={header}
                  boldText={true}
                  key={`${header}s-${key}`}
                  description={description}
                  index={index}
                />
              );
            })}
          {data?.results?.map((props, indexData) => {
            const { id, members, created_by, description, ...otherProps } =
              props;
            return Object.entries(otherProps).map(([key, value], index) => {
              let valueData =
                value !== null
                  ? key === "assigned_to" &&
                    typeof value != "string" &&
                    typeof value != "number"
                    ? value.username
                    : value
                  : "None";
              return (
                <React.Fragment key={`${key}-${id}`}>
                  {data?.results?.length === indexData + 1 && index === 0 ? (
                    <TableRow<H>
                      header={header}
                      boldText={false}
                      description={valueData as string | number}
                      onClick={() => openModal(id)}
                      index={index}
                      ref={lastRef}
                    />
                  ) : (
                    <TableRow<H>
                      header={header}
                      boldText={false}
                      description={valueData as string | number}
                      onClick={() => openModal(id)}
                      index={index}
                    />
                  )}
                  {"name" in props && "handleChangeTeams" in hook && (
                    <ButtonTeamList
                      id={id}
                      teams={teams}
                      hook={hook}
                      props={props}
                      openModal={() => openModal(id)}
                      valueData={valueData as string}
                      setPage={setPage}
                    />
                  )}
                </React.Fragment>
              );
            });
          })}
        </Styles.ListWrapper>
      )}
      {(fetchingData || fetchingSearchData) && page > 1 && <Loader />}
      <ModalDetails<H, TFieldValues>
        header={header}
        modalIsOpen={modalIsOpenDetails}
        closeModal={() => setModalIsOpenDetails(false)}
        list={list as H extends "T" ? Team : LeadAndClient}
        hook={hook}
        teams={teams}
        setPage={setPage}
        endpoint={endpoint}
        resetSearch={resetSearch}
      />
      <ModalForm<H, TFieldValues>
        header={header}
        modalIsOpen={modalIsOpenFormAdd}
        closeModal={() => setModalIsOpenFormAdd(false)}
        hook={hook}
        teams={teams}
        setPage={setPage}
        endpoint={endpoint}
        resetSearch={resetSearch}
      />
    </Styles.Wrapper>
  );
};
export default List;
