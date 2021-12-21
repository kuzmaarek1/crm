import React,{ useEffect, useState }  from "react";
import { NavLink } from "react-router-dom";
import { LeadsWrapper,LeadTitle, LeadHeader, LeadLink, LeadWrapper, LeadModal, ModalButton, ModalWrapper, ModalLeadWrapper} from './Leads.styles.js';
import { useLeads } from "../../hooks/useLeads.js";
import { Button } from "../../components/atoms/Button/Button.js";


const Leads = () => {
 const [leads, setLeads] = useState([]);
 const [lead, setLead] = useState([]);
 const { getLeads,getLeadById, deleteLead } = useLeads();
 const [modalIsOpen, setIsOpen] = React.useState(false);
  const openModal=(id)=> {
    setIsOpen(true);
   (async () => {
      const leadClient = await getLeadById(id);
      setLead(leadClient);
    })();
  }

  const closeModal=()=>{
    setIsOpen(false);
  }

 useEffect(() => {
    (async () => {
      const leadsClient = await getLeads();
      setLeads(leadsClient);
    })();
  }, [getLeads]);

  const handleDelete=(id)=>{
    (async () => {
      const leadsDelete = await deleteLead(id);
      const leadsClient = await getLeads();
      setLeads(leadsClient);
      setIsOpen(false);
    })();
  }
  
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
      </LeadWrapper>
      { leads &&( leads.map((lead)=>(
          <LeadWrapper onClick={()=>openModal(lead.id)}>
            <div>{lead.first_name}</div>
            <div>{lead.last_name}</div>
            <div>{lead.email}</div>
            <div>{lead.phone}</div>
        </LeadWrapper>
      )))}
          <LeadModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
      > 
        <ModalButton>
          <Button to={`/edit-lead/${lead.id}`} as={NavLink} lead>Edit</Button>
          <Button red onClick={()=>handleDelete(lead.id)}>Delete</Button>
        </ModalButton>
        <ModalWrapper>
          <ModalLeadWrapper title>First name</ModalLeadWrapper><ModalLeadWrapper>{lead.first_name}</ModalLeadWrapper>
          <ModalLeadWrapper title>Last name</ModalLeadWrapper><ModalLeadWrapper>{lead.last_name}</ModalLeadWrapper>
          <ModalLeadWrapper title>Email</ModalLeadWrapper><ModalLeadWrapper>{lead.email}</ModalLeadWrapper>
          <ModalLeadWrapper title>Phone</ModalLeadWrapper><ModalLeadWrapper>{lead.phone}</ModalLeadWrapper>
        </ModalWrapper>
      </LeadModal>
    </LeadsWrapper>
  );
};

export default Leads;
