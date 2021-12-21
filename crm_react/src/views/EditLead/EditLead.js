import React, {useEffect, useState,useCallback} from "react";
import { useMatch } from "react-router-dom";
import { useLeads } from "../../hooks/useLeads.js";
import { useForm } from "react-hook-form";
import { EditLeadWrapper, EditLeadHeader,  EditLeadForm, EditLeadLabel, EditLeadInput, EditLeadSpan } from './EditLead.styles.js';
import { Button } from "../../components/atoms/Button/Button.js";

const EditLead = () => {
 const match = useMatch("/edit-lead/:id");
 const leads = useLeads();
 const { getLeadById } = useLeads();
 const [lead, setLead] = useState([]);
 const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const fetchMyAPI = useCallback(async () => { const leadClient = await getLeadById(match.params.id);  setLead(leadClient);  },[lead.id])
 useEffect(() => {
    if(lead.id !== match.params.id ){   
        fetchMyAPI();
        setValue("first_name",lead.first_name);
        setValue("last_name",lead.last_name);
        setValue("email",lead.email);
        setValue("phone",lead.phone);
    }
   console.log(lead.id !== match.params.id);
  }, [fetchMyAPI]);
  return (
    <EditLeadWrapper>
      <EditLeadHeader>Edit Lead</EditLeadHeader>
      <EditLeadForm onSubmit={handleSubmit((register)=>leads.editLead(register,match.params.id))}>
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

        <Button>Submit</Button>
      </EditLeadForm>
    </EditLeadWrapper>)}


export default EditLead;
