import React,{ useEffect, useState }  from "react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../hooks/useAuth.js";
import { NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import { LeadsWrapper,LeadTitle, LeadHeader, LeadLink, LeadWrapper, LeadModal, ModalButton, ModalWrapper, ModalLeadWrapper, LeadForm, LeadInput, LeadLinkDiv} from './Leads.styles.js';
import { useLeads } from "../../hooks/useLeads.js";
import { Button } from "../../components/atoms/Button/Button.js";


const Leads = () => {
 const auth = useAuth();
 const [leads, setLeads] = useState([]);
 const [lead, setLead] = useState([]);
 const { getLeads,getLeadById, deleteLead, searchLead, convert} = useLeads();
 const [modalIsOpen, setIsOpen] = React.useState(false);
 const navigate = useNavigate();
 const {
  register,
  setValue,
  handleSubmit,
  formState: { errors },
} = useForm();
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


  const handleDelete=(name)=>{
    (async () => {
      const leadsDelete = await deleteLead(name, auth.teamid);
      const leadsClient = await getLeads(auth.teamid);
      setLeads(leadsClient);
      setIsOpen(false);
    })();
  }

  const handleConvert=(name)=>{
    (async () => {
      const leadsDelete = await convert(name, auth.teamid);
      const leadsClient = await getLeads(auth.teamid);
      navigate('/clients');
      setLeads(leadsClient);
      setIsOpen(false);
    })();
  }

  const handleSearch=(name)=>{
    (async () => {
      const leadsClient = await searchLead(name, auth.teamid);
      setLeads(leadsClient);
    })();
  }
  return (
    <LeadsWrapper>
      <LeadTitle>
        <LeadHeader>Lead</LeadHeader>
        <LeadForm onSubmit={handleSubmit((register)=>{handleSearch(register.name)})}>
        <LeadInput type="serach" placeholder="Search by first name and last name" {...register("name", { required: true , onChange:(e)=>{handleSearch(e.target.value)}})} />
        </LeadForm>
        <LeadLinkDiv>
          <LeadLink to="/add-lead">Add Lead</LeadLink>
        </LeadLinkDiv>
      </LeadTitle>
      <LeadWrapper title>
            <div>First name</div>
            <div>Last name</div>
            <div>Email</div>
            <div>Phone</div>
            <div>Assigned to</div>
      </LeadWrapper>
      { leads &&(leads.map((lead)=>(
          <LeadWrapper onClick={()=>openModal(lead.id, auth.teamid)}>
            <div>{lead.first_name}</div>
            <div>{lead.last_name}</div>
            <div>{lead.email}</div>
            <div>{lead.phone}</div>
            {lead.assigned_to ? <div>{lead.assigned_to.username}</div>:<div></div>}
        </LeadWrapper>
      )))}
          <LeadModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
      > 
        <ModalButton>
          <Button onClick={()=>handleConvert(lead.id)}>Client</Button>
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
