import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { useLeads } from "hooks/useLeads.js";
import { useGetLeadsQuery, leadsApiSlice } from "reducers/leadsApiSlice";
import { Button, TableLoader } from "components";
import * as Styles from "./styles";

const Leads = () => {
  const dispatch = useDispatch();
  const leadHook = useLeads();
  const teams = useSelector((state) => state.teams);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [lead, setLead] = useState([]);
  const { register, watch } = useForm();

  const {
    data: leads,
    isFetching: fetchingLeads,
    refetch: refetchLeads,
  } = useGetLeadsQuery(teams.currentTeam.id);

  const { isFetching: fetchingSearchLeads } =
    leadsApiSlice.endpoints.searchLead.useQueryState({
      team: teams.currentTeam.id,
      name: watch("name"),
    });

  const openModal = (id) => {
    setModalIsOpen(true);
    const leadFindById = leads.find((lead) => lead.id === id);
    setLead(leadFindById);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <Styles.Wrapper>
      <Styles.Title>
        <Styles.Header>Lead</Styles.Header>
        <Styles.InputWrapper>
          <Styles.Input
            type="serach"
            placeholder="Search by first name and last name"
            {...register("name", {
              required: true,
              onChange: (e) => {
                if (e.target.value === "") {
                  refetchLeads();
                } else {
                  dispatch(
                    leadsApiSlice.util.prefetch(
                      "searchLead",
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
          <Styles.Link to="/add-lead">Add Lead</Styles.Link>
        </Styles.LinkWrapper>
      </Styles.Title>
      <Styles.ListWrapper title="true">
        <div>First name</div>
        <div>Last name</div>
        <div>Email</div>
        <div>Phone</div>
        <div>Assigned to</div>
      </Styles.ListWrapper>
      {fetchingLeads || fetchingSearchLeads ? (
        <TableLoader />
      ) : (
        <>
          {leads?.map((lead) => (
            <Styles.ListWrapper
              key={lead.id}
              onClick={() => openModal(lead.id)}
            >
              <div>{lead.first_name}</div>
              <div>{lead.last_name}</div>
              <div>{lead.email}</div>
              <div>{lead.phone}</div>
              {lead?.assigned_to ? (
                <div>{lead.assigned_to.username}</div>
              ) : (
                <div>Not</div>
              )}
            </Styles.ListWrapper>
          ))}
          <Styles.ModalWrapper
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            ariaHideApp={false}
          >
            <Styles.ButtonWrapper>
              <Button
                onClick={() => {
                  leadHook.handleConvertToClient(lead, teams.currentTeam.id);
                  setModalIsOpen(false);
                }}
              >
                Client
              </Button>
              <Button to={`/edit-lead/${lead.id}`} as={NavLink} lead="true">
                Edit
              </Button>
              <Button
                red
                onClick={() => {
                  leadHook.handleDeleteLead(lead, teams.currentTeam.id);
                  setModalIsOpen(false);
                }}
              >
                Delete
              </Button>
            </Styles.ButtonWrapper>
            <Styles.DetailsWrapper>
              <Styles.Details title="true">First name</Styles.Details>
              <Styles.Details>{lead.first_name}</Styles.Details>
              <Styles.Details title="true">Last name</Styles.Details>
              <Styles.Details>{lead.last_name}</Styles.Details>
              <Styles.Details title="true">Email</Styles.Details>
              <Styles.Details>{lead.email}</Styles.Details>
              <Styles.Details title="true">Phone</Styles.Details>
              <Styles.Details>{lead.phone}</Styles.Details>
              {lead.assigned_to && (
                <>
                  <Styles.Details title="true">Assigned</Styles.Details>
                  <Styles.Details>{lead.assigned_to.username}</Styles.Details>
                </>
              )}
              <Styles.Details title="true" description>
                Description
              </Styles.Details>
              <Styles.Details description>{lead.description}</Styles.Details>
            </Styles.DetailsWrapper>
          </Styles.ModalWrapper>
        </>
      )}
    </Styles.Wrapper>
  );
};

export default Leads;
