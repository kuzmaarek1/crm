import React,{ useEffect, useState }  from "react";
import { LeadsWrapper,LeadTitle, LeadHeader, LeadLink, LeadWrapper } from './Leads.styles.js';
import { NavLink } from "react-router-dom";
import { useLeads } from "../../hooks/useLeads.js";
import { AddLeadHeader } from "../AddLeads/AddLead.styles.js";

const Leads = () => {
 const [leads, setLeads] = useState([]);
 const { getLeads } = useLeads();
 
 useEffect(() => {
    (async () => {
      const leadsClient = await getLeads();
      setLeads(leadsClient);
    })();
  }, [getLeads]);
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
      </LeadWrapper>
      { leads &&( leads.map((lead)=>(
          <LeadWrapper>
            <div>{lead.first_name}</div>
            <div>{lead.last_name}</div>
            <div>{lead.email}</div>
            <div>{lead.phone}</div>
        </LeadWrapper>
      )))}
    </LeadsWrapper>
  );
};

export default Leads;
