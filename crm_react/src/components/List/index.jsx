import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TableLoader, Button, ModalDetails, ModalFormAdd } from "components";
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
}) => {
  const dispatch = useDispatch();
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
      <Styles.Title>
        <Styles.Header>{header}s</Styles.Header>
        <Styles.InputWrapper>
          <Styles.Input
            type="serach"
            placeholder={
              header === "Team"
                ? "Search by name"
                : "Search by first name and last name"
            }
            {...register(`${header.toLowerCase()}-name`, {
              required: true,
              onChange: (e) => {
                if (e.target.value === "") {
                  refetchList();
                } else {
                  dispatch(
                    endpoint.util.prefetch(
                      `search${header}`,
                      { team: teams.currentTeam.id, name: e.target.value },
                      { force: true }
                    )
                  );
                }
              },
            })}
          />
        </Styles.InputWrapper>
        <Styles.ButtonWrapper>
          <Styles.Button onClick={() => setModalIsOpenFormAdd(true)}>
            Add {header}
          </Styles.Button>
        </Styles.ButtonWrapper>
      </Styles.Title>
      {objectKey && (
        <Styles.ListWrapper title="true" team={header === "Team"}>
          {Object.entries(objectKey).map(([key]) => (
            <Styles.GridWrapper key={`${header}s-${key}`}>
              {" "}
              {key[0].toUpperCase()}
              {key.slice(1).replace("_", " ")}
            </Styles.GridWrapper>
          ))}
        </Styles.ListWrapper>
      )}
      {fetchingData || fetchingSearchData ? (
        <TableLoader />
      ) : (
        data?.map(({ id, members, created_by, description, ...otherProps }) => (
          <Styles.ListWrapper
            key={id}
            onClick={() => openModal(id)}
            team={header === "Team"}
          >
            {Object.entries(otherProps).map(([key, value]) => {
              return (
                <React.Fragment key={`${header}-${key}`}>
                  {value !== null ? (
                    <Styles.GridWrapper>
                      {key === "assigned_to" ? value.username : value}
                    </Styles.GridWrapper>
                  ) : (
                    <Styles.GridWrapper>None</Styles.GridWrapper>
                  )}
                </React.Fragment>
              );
            })}
            {header === "Team" && (
              <Styles.GridWrapper team="true">
                {String(id) === String(teams.currentTeam?.id) ? (
                  <Button team red>
                    Current
                  </Button>
                ) : (
                  <Button
                    team
                    onClick={(e) => {
                      e.stopPropagation();
                      hook.handleChangeTeams({
                        id,
                        members,
                        created_by,
                        description,
                        ...otherProps,
                      });
                    }}
                  >
                    Activate
                  </Button>
                )}
              </Styles.GridWrapper>
            )}
          </Styles.ListWrapper>
        ))
      )}
      <ModalDetails
        header={header}
        modalIsOpen={modalIsOpenDetails}
        closeModal={() => setModalIsOpenDetails(false)}
        list={list}
        hook={hook}
        teams={teams}
      />
      <ModalFormAdd
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
