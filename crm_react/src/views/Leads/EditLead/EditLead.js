import React, { useEffect, useState, useCallback } from "react";
import { useMatch } from "react-router-dom";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useAuth } from "hooks/useAuth.js";
import { useLeads } from "hooks/useLeads.js";
import { useTeams } from "hooks/useTeams.js";
import {
  EditLeadWrapper,
  EditLeadHeader,
  EditLeadForm,
  EditLeadLabel,
  EditLeadInput,
  EditLeadSpan,
  EditLeadTextarea,
  EditLeadSelect,
} from "./EditLead.styles.js";
import { Button } from "components/Button/Button.js";

const EditLead = () => {
  const leadHook = useLeads();
  const leads = useSelector((state) => state.leads);
  const [lead, setLead] = useState(null);
  const teams = useSelector((state) => state.teams);
  const match = useMatch("/edit-lead/:id");
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const findLeadById = leads.leadsData.find(
      (lead) => String(lead.id) === String(match.params.id)
    );
    setLead(findLeadById);
    Object.entries(findLeadById).forEach(([key, value]) => {
      setValue(key, value);
    });
  }, []);

  return (
    <EditLeadWrapper>
      <EditLeadHeader>Edit Lead</EditLeadHeader>
      <EditLeadForm
        onSubmit={handleSubmit((register) =>
          leadHook.handleEditLead(
            match.params.id,
            teams.currentTeam.id,
            register
          )
        )}
      >
        <EditLeadLabel htmlFor="first_name">First name</EditLeadLabel>
        <EditLeadInput
          type="text"
          name="first_name"
          id="first_name"
          {...register("first_name", { required: true })}
        />
        {errors.first_name && (
          <EditLeadSpan>First name is required</EditLeadSpan>
        )}
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
        {errors.description && (
          <EditLeadSpan>Description is required</EditLeadSpan>
        )}
        <EditLeadLabel htmlFor="description">Assigned to</EditLeadLabel>
        <EditLeadSelect {...register("assigned_to")}>
          {!lead?.assigned_to && <option value="">None</option>}
          {teams?.currentTeam?.members?.map((member) => (
            <option value={member.username} key={member.id}>
              {member.username}
            </option>
          ))}
        </EditLeadSelect>
        <Button>Submit</Button>
      </EditLeadForm>
    </EditLeadWrapper>
  );
};

export default EditLead;
