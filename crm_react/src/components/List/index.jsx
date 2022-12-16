import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TableLoader, Button, ModalDetails, ModalForm } from "components";
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
            placeholder="Search"
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
          <Styles.Label>
            {header === "Team" ? "Name" : "First name and last name"}
          </Styles.Label>
          <Styles.SearchIcon
            size={"20px"}
            onClick={() => {
              setFocus(`${header.toLowerCase()}-name`);
            }}
          />
        </Styles.InputWrapper>
        <Styles.ButtonWrapper>
          <Button width="50%" onClick={() => setModalIsOpenFormAdd(true)}>
            Add {header}
          </Button>
        </Styles.ButtonWrapper>
      </Styles.Title>
      <Styles.ListWrapper team={header === "Team"}>
        {objectKey &&
          Object.entries(objectKey).map(([key]) => (
            <Styles.RowWrapper title="true" key={`${header}s-${key}`}>
              <Styles.GridWrapper team={header === "Team"}>
                {key[0].toUpperCase()}
                {key.slice(1).replace("_", " ")}
              </Styles.GridWrapper>
              {header === "Team" && (
                <Styles.GridWrapper
                  team={header === "Team"}
                ></Styles.GridWrapper>
              )}
            </Styles.RowWrapper>
          ))}
        {fetchingData || fetchingSearchData ? (
          <TableLoader />
        ) : (
          data?.map(
            ({ id, members, created_by, description, ...otherProps }) => (
              <React.Fragment key={id}>
                {Object.entries(otherProps).map(([key, value]) => {
                  return (
                    <Styles.RowWrapper
                      onClick={() => openModal(id)}
                      key={`${header}-${key}`}
                    >
                      {value !== null ? (
                        <Styles.GridWrapper team={header === "Team"}>
                          {key === "assigned_to" ? value.username : value}
                        </Styles.GridWrapper>
                      ) : (
                        <Styles.GridWrapper team={header === "Team"}>
                          None
                        </Styles.GridWrapper>
                      )}
                      {header === "Team" && (
                        <Styles.GridWrapper
                          team="true"
                          button={header === "Team"}
                        >
                          {String(id) === String(teams.currentTeam?.id) ? (
                            <Button team red width="200px" height="4vh">
                              Current
                            </Button>
                          ) : (
                            <Button
                              width="200px"
                              height="4vh"
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
                    </Styles.RowWrapper>
                  );
                })}
              </React.Fragment>
            )
          )
        )}
      </Styles.ListWrapper>
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
