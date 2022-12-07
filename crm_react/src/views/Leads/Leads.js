import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import TableLoader from "components/TableLoader/TableLoader";
import { Button } from "components/Button/Button.js";
import { useLeads } from "hooks/useLeads.js";
import { useGetLeadsQuery, leadsApiSlice } from "reducers/leadsApiSlice";
import {
  LeadsWrapper,
  LeadTitle,
  LeadHeader,
  LeadLink,
  LeadWrapper,
  LeadModal,
  ModalButton,
  ModalWrapper,
  ModalLeadWrapper,
  LeadInputWrapper,
  LeadInput,
  LeadLinkDiv,
} from "./Leads.styles.js";

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
    <LeadsWrapper>
      <LeadTitle>
        <LeadHeader>Lead</LeadHeader>
        <LeadInputWrapper>
          <LeadInput
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
        </LeadInputWrapper>
        <LeadLinkDiv>
          <LeadLink to="/add-lead">Add Lead</LeadLink>
        </LeadLinkDiv>
      </LeadTitle>
      <LeadWrapper title="true">
        <div>First name</div>
        <div>Last name</div>
        <div>Email</div>
        <div>Phone</div>
        <div>Assigned to</div>
      </LeadWrapper>
      {fetchingLeads || fetchingSearchLeads ? (
        <TableLoader />
      ) : (
        <>
          {leads?.map((lead) => (
            <LeadWrapper key={lead.id} onClick={() => openModal(lead.id)}>
              <div>{lead.first_name}</div>
              <div>{lead.last_name}</div>
              <div>{lead.email}</div>
              <div>{lead.phone}</div>
              {lead?.assigned_to ? (
                <div>{lead.assigned_to.username}</div>
              ) : (
                <div>Not</div>
              )}
            </LeadWrapper>
          ))}
          <LeadModal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            ariaHideApp={false}
          >
            <ModalButton>
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
            </ModalButton>
            <ModalWrapper>
              <ModalLeadWrapper title="true">First name</ModalLeadWrapper>
              <ModalLeadWrapper>{lead.first_name}</ModalLeadWrapper>
              <ModalLeadWrapper title="true">Last name</ModalLeadWrapper>
              <ModalLeadWrapper>{lead.last_name}</ModalLeadWrapper>
              <ModalLeadWrapper title="true">Email</ModalLeadWrapper>
              <ModalLeadWrapper>{lead.email}</ModalLeadWrapper>
              <ModalLeadWrapper title="true">Phone</ModalLeadWrapper>
              <ModalLeadWrapper>{lead.phone}</ModalLeadWrapper>
              {lead.assigned_to && (
                <>
                  <ModalLeadWrapper title="true">Assigned</ModalLeadWrapper>
                  <ModalLeadWrapper>
                    {lead.assigned_to.username}
                  </ModalLeadWrapper>
                </>
              )}
              <ModalLeadWrapper title="true" description>
                Description
              </ModalLeadWrapper>
              <ModalLeadWrapper description>
                {lead.description}
              </ModalLeadWrapper>
            </ModalWrapper>
          </LeadModal>
        </>
      )}
    </LeadsWrapper>
  );
};

export default Leads;
