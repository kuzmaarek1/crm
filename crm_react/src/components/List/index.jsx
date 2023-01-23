import React, { useState, useRef, useCallback } from "react";
import { useSelector } from "react-redux";
import {
  TableLoader,
  ModalDetails,
  ModalForm,
  HeaderList,
  TableRow,
  ButtonTeamList,
} from "components";
import * as Styles from "./styles";

const List = ({
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
}) => {
  const intObserver = useRef();

  const lastRef = useCallback(
    (node) => {
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

  const teams = useSelector((state) => state.teams);
  const [modalIsOpenDetails, setModalIsOpenDetails] = useState(false);
  const [modalIsOpenFormAdd, setModalIsOpenFormAdd] = useState(false);
  const [list, setList] = useState([]);
  let objectKey = null;

  const openModal = (dataId) => {
    setModalIsOpenDetails(true);
    const dataFindById = data?.results?.find(({ id }) => id === dataId);
    setList(dataFindById);
  };

  if (data?.results !== undefined && data?.results?.length !== 0) {
    let { id, created_by, description, members, ...otherData } =
      data.results[0];
    objectKey = otherData;
  }

  return (
    <Styles.Wrapper>
      <HeaderList
        header={header}
        endpoint={endpoint}
        teams={teams}
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
                <TableRow
                  header={header}
                  title="true"
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
                  ? key === "assigned_to"
                    ? value.username
                    : value
                  : "None";
              return (
                <React.Fragment key={`${key}-${id}`}>
                  {data?.results?.length === indexData + 1 && index === 0 ? (
                    <TableRow
                      header={header}
                      description={valueData}
                      onClick={() => openModal(id)}
                      index={index}
                      ref={lastRef}
                    />
                  ) : (
                    <TableRow
                      header={header}
                      description={valueData}
                      onClick={() => openModal(id)}
                      index={index}
                    />
                  )}
                  {header === "Team" && (
                    <ButtonTeamList
                      id={id}
                      teams={teams}
                      hook={hook}
                      props={props}
                      openModal={() => openModal(id)}
                      valueData={valueData}
                      setPage={setPage}
                    />
                  )}
                </React.Fragment>
              );
            });
          })}
        </Styles.ListWrapper>
      )}
      {(fetchingData || fetchingSearchData) && page !== 1 && (
        <div>Loading More</div>
      )}
      <ModalDetails
        header={header}
        modalIsOpen={modalIsOpenDetails}
        closeModal={() => setModalIsOpenDetails(false)}
        list={list}
        hook={hook}
        teams={teams}
        setPage={setPage}
        endpoint={endpoint}
        resetSearch={resetSearch}
      />
      <ModalForm
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
