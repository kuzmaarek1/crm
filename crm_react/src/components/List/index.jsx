import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TableLoader, ModalDetails, Button } from "components";
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
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [list, setList] = useState([]);

  const openModal = (dataId) => {
    setModalIsOpen(true);
    const dataFindById = data.find(({ id }) => id === dataId);
    setList(dataFindById);
  };

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
        <Styles.LinkWrapper>
          <Styles.Link to={`/add-${header.toLowerCase()}`}>
            Add {header}
          </Styles.Link>
        </Styles.LinkWrapper>
      </Styles.Title>
      {data !== undefined && data?.length !== 0 && (
        <>
          <Styles.ListWrapper title="true" team={header === "Team"}>
            {Object.entries(data[0]).map(
              ([key]) =>
                key !== "id" &&
                key !== "created_by" &&
                key !== "description" &&
                key !== "members" && (
                  <Styles.GridWrapper key={`${header}s-${key}`}>
                    {" "}
                    {key[0].toUpperCase()}
                    {key.slice(1).replace("_", " ")}
                  </Styles.GridWrapper>
                )
            )}
          </Styles.ListWrapper>
          {fetchingData || fetchingSearchData ? (
            <TableLoader />
          ) : (
            <>
              {data?.map((props) => (
                <Styles.ListWrapper
                  key={props.id}
                  onClick={() => openModal(props.id)}
                  team={header === "Team"}
                >
                  {Object.entries(props).map(([key, value]) => {
                    return (
                      <React.Fragment key={`${header}-${key}`}>
                        {value !== null ? (
                          key !== "id" &&
                          key !== "members" &&
                          key !== "created_by" &&
                          key !== "description" && (
                            <Styles.GridWrapper>
                              {key === "assigned_to" ? value.username : value}
                            </Styles.GridWrapper>
                          )
                        ) : (
                          <Styles.GridWrapper>Not</Styles.GridWrapper>
                        )}
                      </React.Fragment>
                    );
                  })}
                  {header === "Team" && (
                    <Styles.GridWrapper team="true">
                      {String(props.id) === String(teams.currentTeam?.id) ? (
                        <Button team red>
                          Current
                        </Button>
                      ) : (
                        <Button
                          team
                          onClick={(e) => {
                            e.stopPropagation();
                            hook.handleChangeTeams(props);
                          }}
                        >
                          Activate
                        </Button>
                      )}
                    </Styles.GridWrapper>
                  )}
                </Styles.ListWrapper>
              ))}
            </>
          )}
        </>
      )}
      <ModalDetails
        header={header}
        modalIsOpen={modalIsOpen}
        closeModal={() => setModalIsOpen(false)}
        list={list}
        hook={hook}
        teams={teams}
      />
    </Styles.Wrapper>
  );
};
export default List;
