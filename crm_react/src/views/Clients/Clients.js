import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useClients } from "hooks/useClients.js";
import { getClients } from "actions/clients.js";
import { Button } from "components/Button/Button.js";
import {
  ClientsWrapper,
  ClientTitle,
  ClientHeader,
  ClientLink,
  ClientWrapper,
  ClientModal,
  ClientButton,
  ModalWrapper,
  ModalClientWrapper,
  ClientForm,
  ClientInput,
  ClientLinkDiv,
} from "./Clients.styles.js";

const Clients = () => {
  const dispatch = useDispatch();
  const clientHook = useClients();
  const clients = useSelector((state) => state.clients);
  const teams = useSelector((state) => state.teams);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [client, setClient] = useState([]);
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    dispatch(getClients(teams.currentTeam.id));
  }, []);

  const openModal = (id) => {
    setModalIsOpen(true);
    const clientFindById = clients.clientsData.find(
      (client) => client.id === id
    );
    setClient(clientFindById);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <ClientsWrapper>
      <ClientTitle>
        <ClientHeader>Client</ClientHeader>
        <ClientForm
          onSubmit={handleSubmit((register) => {
            clientHook.handleSearchClients(teams.currentTeam.id, register.name);
          })}
        >
          <ClientInput
            type="serach"
            placeholder="Search by first name and last name"
            {...register("name", {
              required: true,
              onChange: (e) => {
                clientHook.handleSearchClients(
                  teams.currentTeam.id,
                  e.target.value
                );
              },
            })}
          />
        </ClientForm>
        <ClientLinkDiv>
          <ClientLink to="/add-client">Add Client</ClientLink>
        </ClientLinkDiv>
      </ClientTitle>
      <ClientWrapper title="true">
        <div>First name</div>
        <div>Last name</div>
        <div>Email</div>
        <div>Phone</div>
        <div>Assigned to</div>
      </ClientWrapper>
      {clients?.clientsData?.map((client) => (
        <ClientWrapper key={client?.id} onClick={() => openModal(client.id)}>
          <div>{client.first_name}</div>
          <div>{client.last_name}</div>
          <div>{client.email}</div>
          <div>{client.phone}</div>
          {client.assigned_to ? (
            <div>{client.assigned_to.username}</div>
          ) : (
            <div></div>
          )}
        </ClientWrapper>
      ))}
      <ClientModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        ariaHideApp={false}
      >
        <ClientButton>
          <Button to={`/edit-client/${client.id}`} as={NavLink} lead="true">
            Edit
          </Button>
          <Button
            red
            onClick={() => {
              clientHook.handleDeleteClient(client.id, teams.currentTeam.id);
              setModalIsOpen(false);
            }}
          >
            Delete
          </Button>
        </ClientButton>
        <ModalWrapper>
          <ModalClientWrapper title="true">First name</ModalClientWrapper>
          <ModalClientWrapper>{client.first_name}</ModalClientWrapper>
          <ModalClientWrapper title="true">Last name</ModalClientWrapper>
          <ModalClientWrapper>{client.last_name}</ModalClientWrapper>
          <ModalClientWrapper title="true">Email</ModalClientWrapper>
          <ModalClientWrapper>{client.email}</ModalClientWrapper>
          <ModalClientWrapper title="true">Phone</ModalClientWrapper>
          <ModalClientWrapper>{client.phone}</ModalClientWrapper>
          {client.assigned_to && (
            <>
              <ModalClientWrapper title="true">Assigned</ModalClientWrapper>
              <ModalClientWrapper>
                {client.assigned_to.username}
              </ModalClientWrapper>
            </>
          )}
          <ModalClientWrapper title="true" description>
            Description
          </ModalClientWrapper>
          <ModalClientWrapper description>
            {client.description}
          </ModalClientWrapper>
        </ModalWrapper>
      </ClientModal>
    </ClientsWrapper>
  );
};

export default Clients;
