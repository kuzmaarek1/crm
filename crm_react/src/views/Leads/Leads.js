import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "hooks/useAuth.js";
import { NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";
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
  LeadForm,
  LeadInput,
  LeadLinkDiv,
} from "./Leads.styles.js";
import { Button } from "components/Button/Button.js";
import { useSelector, useDispatch } from "react-redux";
import { getLeads } from "actions/leads.js";
import { useLeads } from "hooks/useLeads.js";

const Leads = () => {
  const dispatch = useDispatch();
  const leadHook = useLeads();
  const leads = useSelector((state) => state.leads);
  const teams = useSelector((state) => state.teams);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [lead, setLead] = useState([]);
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    dispatch(getLeads(teams.currentTeam.id));
  }, []);

  const openModal = (id) => {
    setModalIsOpen(true);
    const leadFindById = leads.leadsData.find((lead) => lead.id === id);
    setLead(leadFindById);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <LeadsWrapper>
      <LeadTitle>
        <LeadHeader>Lead</LeadHeader>
        <LeadForm
          onSubmit={handleSubmit((register) => {
            leadHook.handleSearchLeads(teams.currentTeam.id, register.name);
          })}
        >
          <LeadInput
            type="serach"
            placeholder="Search by first name and last name"
            {...register("name", {
              required: true,
              onChange: (e) => {
                leadHook.handleSearchLeads(
                  teams.currentTeam.id,
                  e.target.value
                );
              },
            })}
          />
        </LeadForm>
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
      {leads?.leadsData?.map((lead) => (
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
          {/*
          <Button onClick={() => handleConvert(lead.id)}>Client</Button>
                    */}
          <Button to={`/edit-lead/${lead.id}`} as={NavLink} lead="true">
            Edit
          </Button>
          <Button
            red
            onClick={() => {
              leadHook.handleDeleteLead(lead.id, teams.currentTeam.id);
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
              <ModalLeadWrapper>{lead.assigned_to.username}</ModalLeadWrapper>
            </>
          )}
          <ModalLeadWrapper title="true" description>
            Description
          </ModalLeadWrapper>
          <ModalLeadWrapper description>{lead.description}</ModalLeadWrapper>
        </ModalWrapper>
      </LeadModal>
    </LeadsWrapper>
  );
};

export default Leads;
