import React, {useEffect, useState,useCallback} from "react";
import { useAuth } from "../../hooks/useAuth.js";
import { useMatch } from "react-router-dom";
import { useClients } from "../../hooks/useClients.js";
import { useTeams } from "../../hooks/useTeams.js";
import { useForm } from "react-hook-form";
import { EditClientWrapper, EditClientHeader,  EditClientForm, EditClientLabel, EditClientInput, EditClientSpan, EditClientTextarea, EditClientSelect } from './EditClient.styles.js';
import { Button } from "../../components/atoms/Button/Button.js";

const EditClient = () => {
 const auth=useAuth();
 const match = useMatch("/edit-client/:id");
 const clients = useClients();
 const { getClientById } = useClients();
 const [client, setClient] = useState([]);
 const [team, setTeam] = useState([]);
 const {getTeamsById} = useTeams();
 const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const fetchMyAPI = useCallback(async () => { const leadClient = await getClientById(match.params.id, auth.teamid);  setClient(leadClient[0]);  },[client.id])
 useEffect(() => {
    if(client.id !== match.params.id ){   
        fetchMyAPI();
        setValue("first_name",client.first_name);
        setValue("last_name",client.last_name);
        setValue("email",client.email);
        setValue("phone",client.phone);
        setValue("description",client.description);
        client.assigned_to && setValue("assigned_to",client.assigned_to.username);
    }
  }, [fetchMyAPI]);
  useEffect(() => {
    (async () => {
      const teamsClient = await getTeamsById(auth.teamid);
      setTeam(teamsClient);
    })();
  }, [getTeamsById, auth.teamid]);
  return (
    <EditClientWrapper>
      <EditClientHeader>Edit Client</EditClientHeader>
      <EditClientForm onSubmit={handleSubmit((register)=>clients.editClient(register,match.params.id, auth.teamid))}>
           <EditClientLabel htmlFor="first_name">First name</EditClientLabel>
        <EditClientInput
          type="text"
          name="first_name"
          id="first_name"
          {...register('first_name',{ required: true })
        }
        />
        {errors.first_name && <EditClientSpan>First name is required</EditClientSpan>}
        <EditClientLabel htmlFor="last_name">Last name</EditClientLabel>
        <EditClientInput
          type="text"
          name="last_name"
          id="last_name"
          {...register("last_name", { required: true })}
        />
        {errors.last_name && <EditClientSpan>Last name is required</EditClientSpan>}
        <EditClientLabel htmlFor="email">Email</EditClientLabel>
        <EditClientInput
          type="email"
          name="email"
          id="email"
          {...register("email", { required: true })}
        />
         {errors.email && <EditClientSpan>Email is required</EditClientSpan>}
         <EditClientLabel htmlFor="phone">Phone</EditClientLabel>
        <EditClientInput
          type="number"
          name="phone"
          id="phone"
          {...register("phone", { required: true })}
        />
         {errors.phone && <EditClientSpan>Phone is required</EditClientSpan>}
         <EditClientLabel htmlFor="description">Description</EditClientLabel>
         <EditClientTextarea
          type="description"
          name="description"
          id="description"
          {...register("description", { required: true })}
        />
        {errors.description && <EditClientSpan>Description is required</EditClientSpan>}
        <EditClientLabel htmlFor="description">Assigned to</EditClientLabel>
        <EditClientSelect {...register("assigned_to")}>
          {!client.assigned_to && <option value="">None</option>}
          {team.members && team.members.map((member)=><option value={member.username}>{member.username}</option>)}
        </EditClientSelect>
        <Button>Submit</Button>
      </EditClientForm>
    </EditClientWrapper>)}


export default EditClient;
