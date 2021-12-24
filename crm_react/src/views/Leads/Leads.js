import React,{ useEffect, useState }  from "react";
import { useAuth } from "../../hooks/useAuth.js";
import { NavLink } from "react-router-dom";
import { LeadsWrapper,LeadTitle, LeadHeader, LeadLink, LeadWrapper, LeadModal, ModalButton, ModalWrapper, ModalLeadWrapper} from './Leads.styles.js';
import { useLeads } from "../../hooks/useLeads.js";
import { Button } from "../../components/atoms/Button/Button.js";


const Leads = () => {
 const auth = useAuth();
 const [leads, setLeads] = useState([]);
 const [lead, setLead] = useState([]);
 const { getLeads,getLeadById, deleteLead } = useLeads();
 const [modalIsOpen, setIsOpen] = React.useState(false);
  const openModal=(id_lead, id_team)=> {
    setIsOpen(true);
   (async () => {
      const leadClient = await getLeadById(id_lead, id_team);
      setLead(leadClient[0]);
    })();
  }

  const closeModal=()=>{
    setIsOpen(false);
  }

 useEffect(() => {
    (async () => {
      const leadsClient = await getLeads(auth.teamid);
      setLeads(leadsClient);
    })();
  }, [getLeads, auth.teamid]);


  const handleDelete=(id)=>{
    console.log(id);
    (async () => {
      const leadsDelete = await deleteLead(id, auth.teamid);
      const leadsClient = await getLeads(auth.teamid);
      setLeads(leadsClient);
      setIsOpen(false);
    })();
  }
  console.log(leads);
  return (
    <LeadsWrapper>
      <LeadTitle>
        <LeadHeader>Lead</LeadHeader>
        <LeadLink to="/add-lead">Add Lead</LeadLink>
      </LeadTitle>
      <LeadWrapper title>
            <div>First name</div>
            <div>Last name</div>
            <div>Email</div>
            <div>Phone</div>
            <div>Assigned_to</div>
      </LeadWrapper>
      { leads &&( leads.map((lead)=>(
          <LeadWrapper onClick={()=>openModal(lead.id, auth.teamid)}>
            <div>{lead.first_name}</div>
            <div>{lead.last_name}</div>
            <div>{lead.email}</div>
            <div>{lead.phone}</div>
            <div>{lead.assigned_to.username}</div>
        </LeadWrapper>
      )))}
          <LeadModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
      > 
        <ModalButton>
          {console.log(lead.id)}
          <Button to={`/edit-lead/${lead.id}`} as={NavLink} lead>Edit</Button>
          <Button red onClick={()=>handleDelete(lead.id)}>Delete</Button>
        </ModalButton>
        <ModalWrapper>
          <ModalLeadWrapper title>First name</ModalLeadWrapper><ModalLeadWrapper>{lead.first_name}</ModalLeadWrapper>
          <ModalLeadWrapper title>Last name</ModalLeadWrapper><ModalLeadWrapper>{lead.last_name}</ModalLeadWrapper>
          <ModalLeadWrapper title>Email</ModalLeadWrapper><ModalLeadWrapper>{lead.email}</ModalLeadWrapper>
          <ModalLeadWrapper title>Phone</ModalLeadWrapper><ModalLeadWrapper>{lead.phone}</ModalLeadWrapper>
          {lead.assigned_to && (<><ModalLeadWrapper title>Assigned</ModalLeadWrapper><ModalLeadWrapper>{lead.assigned_to.username}</ModalLeadWrapper></>)}
          <ModalLeadWrapper title description>Description</ModalLeadWrapper><ModalLeadWrapper description>{lead.description}</ModalLeadWrapper>
        </ModalWrapper>
      </LeadModal>
    </LeadsWrapper>
  );
};

export default Leads;
