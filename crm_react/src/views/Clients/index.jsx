import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useClients } from "hooks/useClients.js";
import { useGetClientsQuery, clientsApiSlice } from "reducers/clientsApiSlice";
import { Button, TableLoader } from "components";
import * as Styles from "./styles";

const Clients = () => {
  const dispatch = useDispatch();
  const clientHook = useClients();
  const teams = useSelector((state) => state.teams);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [client, setClient] = useState([]);
  const { register, watch } = useForm();

  const {
    data: clients,
    isFetching: fetchingClients,
    refetch: refetchClients,
  } = useGetClientsQuery(teams.currentTeam.id);

  const { isFetching: fetchingSearchClients } =
    clientsApiSlice.endpoints.searchClient.useQueryState({
      team: teams.currentTeam.id,
      name: watch("name"),
    });

  const openModal = (id) => {
    setModalIsOpen(true);
    const clientFindById = clients.find((client) => client.id === id);
    setClient(clientFindById);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <Styles.Wrapper>
      <Styles.Title>
        <Styles.Header>Client</Styles.Header>
        <Styles.InputWrapper>
          <Styles.Input
            type="serach"
            placeholder="Search by first name and last name"
            {...register("name", {
              required: true,
              onChange: (e) => {
                if (e.target.value === "") {
                  refetchClients();
                } else {
                  dispatch(
                    clientsApiSlice.util.prefetch(
                      "searchClient",
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
          <Styles.Link to="/add-client">Add Client</Styles.Link>
        </Styles.LinkWrapper>
      </Styles.Title>
      <Styles.ListWrapper title="true">
        <div>First name</div>
        <div>Last name</div>
        <div>Email</div>
        <div>Phone</div>
        <div>Assigned to</div>
      </Styles.ListWrapper>
      {fetchingClients || fetchingSearchClients ? (
        <TableLoader />
      ) : (
        <>
          {clients?.map((client) => (
            <Styles.ListWrapper
              key={client?.id}
              onClick={() => openModal(client.id)}
            >
              <div>{client.first_name}</div>
              <div>{client.last_name}</div>
              <div>{client.email}</div>
              <div>{client.phone}</div>
              {client.assigned_to ? (
                <div>{client.assigned_to.username}</div>
              ) : (
                <div></div>
              )}
            </Styles.ListWrapper>
          ))}
          <Styles.ModalWrapper
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            ariaHideApp={false}
          >
            <Styles.ButtonWrapper>
              <Button to={`/edit-client/${client.id}`} as={NavLink} lead="true">
                Edit
              </Button>
              <Button
                red
                onClick={() => {
                  clientHook.handleDeleteClient(client, teams.currentTeam.id);
                  setModalIsOpen(false);
                }}
              >
                Delete
              </Button>
            </Styles.ButtonWrapper>
            <Styles.DetailsWrapper>
              <Styles.Details title="true">First name</Styles.Details>
              <Styles.Details>{client.first_name}</Styles.Details>
              <Styles.Details title="true">Last name</Styles.Details>
              <Styles.Details>{client.last_name}</Styles.Details>
              <Styles.Details title="true">Email</Styles.Details>
              <Styles.Details>{client.email}</Styles.Details>
              <Styles.Details title="true">Phone</Styles.Details>
              <Styles.Details>{client.phone}</Styles.Details>
              {client.assigned_to && (
                <>
                  <Styles.Details title="true">Assigned</Styles.Details>
                  <Styles.Details>{client.assigned_to.username}</Styles.Details>
                </>
              )}
              <Styles.Details title="true" description>
                Description
              </Styles.Details>
              <Styles.Details description>{client.description}</Styles.Details>
            </Styles.DetailsWrapper>
          </Styles.ModalWrapper>
        </>
      )}
    </Styles.Wrapper>
  );
};

export default Clients;
