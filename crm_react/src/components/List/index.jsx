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
  refetchList,
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
    const dataFindById = data.find(({ id }) => id === dataId);
    setList(dataFindById);
  };

  if (data !== undefined && data?.length !== 0) {
    let { id, created_by, description, members, ...otherData } = data[0];
    objectKey = otherData;
  }
  return (
    <Styles.Wrapper>
      <HeaderList
        header={header}
        register={register}
        endpoint={endpoint}
        teams={teams}
        refetchList={refetchList}
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
          {data?.map((props) => {
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
