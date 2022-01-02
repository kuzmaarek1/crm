import React, {useEffect, useState,useCallback} from "react";
import { useAuth } from "../../../hooks/useAuth.js";
import { useMatch } from "react-router-dom";
import { useLeads } from "../../../hooks/useLeads.js";
import { useTeams } from "../../../hooks/useTeams.js";
import { useForm } from "react-hook-form";
import { EditLeadWrapper, EditLeadHeader,  EditLeadForm, EditLeadLabel, EditLeadInput, EditLeadSpan, EditLeadTextarea, EditLeadSelect } from './EditLead.styles.js';
import { Button } from "../../../components/Button/Button.js";

const EditLead = () => {
 const auth=useAuth();
 const match = useMatch("/edit-lead/:id");
 const leads = useLeads();
 const { getLeadById } = useLeads();
 const [lead, setLead] = useState([]);
 const [team, setTeam] = useState([]);
 const {getTeamsById} = useTeams();
 const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const fetchMyAPI = useCallback(async () => { const leadClient = await getLeadById(match.params.id, auth.teamid);  setLead(leadClient[0]);  },[lead.id])
 useEffect(() => {
    if(lead.id !== match.params.id ){   
        fetchMyAPI();
        setValue("first_name",lead.first_name);
        setValue("last_name",lead.last_name);
        setValue("email",lead.email);
        setValue("phone",lead.phone);
        setValue("description",lead.description);
        lead.assigned_to && setValue("assigned_to",lead.assigned_to.username);
    }
  }, [fetchMyAPI]);
  useEffect(() => {
    (async () => {
      const teamsClient = await getTeamsById(auth.teamid);
      setTeam(teamsClient);
    })();
  }, [getTeamsById, auth.teamid]);
  return (
    <EditLeadWrapper>
      <EditLeadHeader>Edit Lead</EditLeadHeader>
      <EditLeadForm onSubmit={handleSubmit((register)=>leads.editLead(register,match.params.id, auth.teamid))}>
           <EditLeadLabel htmlFor="first_name">First name</EditLeadLabel>
        <EditLeadInput
          type="text"
          name="first_name"
          id="first_name"
          {...register('first_name',{ required: true })
        }
        />
        {errors.first_name && <EditLeadSpan>First name is required</EditLeadSpan>}
        <EditLeadLabel htmlFor="last_name">Last name</EditLeadLabel>
        <EditLeadInput
          type="text"
          name="last_name"
          id="last_name"
          {...register("last_name", { required: true })}
        />
        {errors.last_name && <EditLeadSpan>Last name is required</EditLeadSpan>}
        <EditLeadLabel htmlFor="email">Email</EditLeadLabel>
        <EditLeadInput
          type="email"
          name="email"
          id="email"
          {...register("email", { required: true })}
        />
         {errors.email && <EditLeadSpan>Email is required</EditLeadSpan>}
         <EditLeadLabel htmlFor="phone">Phone</EditLeadLabel>
        <EditLeadInput
          type="number"
          name="phone"
          id="phone"
          {...register("phone", { required: true })}
        />
         {errors.phone && <EditLeadSpan>Phone is required</EditLeadSpan>}
         <EditLeadLabel htmlFor="description">Description</EditLeadLabel>
         <EditLeadTextarea
          type="description"
          name="description"
          id="description"
          {...register("description", { required: true })}
        />
        {errors.description && <EditLeadSpan>Description is required</EditLeadSpan>}
        <EditLeadLabel htmlFor="description">Assigned to</EditLeadLabel>
        <EditLeadSelect {...register("assigned_to")}>
          {!lead.assigned_to && <option value="">None</option>}
          {team.members && team.members.map((member)=><option value={member.username}>{member.username}</option>)}
        </EditLeadSelect>
        <Button>Submit</Button>
      </EditLeadForm>
    </EditLeadWrapper>)}


export default EditLead;
