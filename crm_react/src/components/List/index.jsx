import React, { useState } from "react";
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
}) => {
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
      />
      {fetchingData || fetchingSearchData ? (
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
          {data?.results?.map((props) => {
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
                  <TableRow
                    header={header}
                    description={valueData}
                    onClick={() => openModal(id)}
                    index={index}
                  />
                  {header === "Team" && (
                    <ButtonTeamList
                      id={id}
                      teams={teams}
                      hook={hook}
                      props={props}
                      openModal={() => openModal(id)}
                      valueData={valueData}
                    />
                  )}
                </React.Fragment>
              );
            });
          })}
        </Styles.ListWrapper>
      )}
      <ModalDetails
        header={header}
        modalIsOpen={modalIsOpenDetails}
        closeModal={() => setModalIsOpenDetails(false)}
        list={list}
        hook={hook}
        teams={teams}
      />
      <ModalForm
        header={header}
        modalIsOpen={modalIsOpenFormAdd}
        closeModal={() => setModalIsOpenFormAdd(false)}
        hook={hook}
        teams={teams}
      />
    </Styles.Wrapper>
  );
};
export default List;
