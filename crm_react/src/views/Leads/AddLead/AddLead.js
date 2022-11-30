import React from "react";
import { useLeads } from "hooks/useLeads.js";
import { useForm } from "react-hook-form";
import {
  AddLeadWrapper,
  AddLeadHeader,
  AddLeadForm,
  AddLeadLabel,
  AddLeadInput,
  AddLeadSpan,
  AddLeadTextarea,
} from "./AddLead.styles.js";
import { Button } from "components/Button/Button.js";
import { useSelector } from "react-redux";

const AddLead = () => {
  const lead = useLeads();
  const teams = useSelector((state) => state.teams);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return (
    <AddLeadWrapper>
      <AddLeadHeader>Add Lead</AddLeadHeader>
      <AddLeadForm
        onSubmit={handleSubmit((register) =>
          lead.handleAddLead(teams.currentTeam.id, register)
        )}
      >
        <AddLeadLabel htmlFor="first_name">First name</AddLeadLabel>
        <AddLeadInput
          type="text"
          name="first_name"
          id="first_name"
          {...register("first_name", { required: true })}
        />
        {errors.first_name && <AddLeadSpan>First name is required</AddLeadSpan>}
        <AddLeadLabel htmlFor="last_name">Last name</AddLeadLabel>
        <AddLeadInput
          type="text"
          name="last_name"
          id="last_name"
          {...register("last_name", { required: true })}
        />
        {errors.last_name && <AddLeadSpan>Last name is required</AddLeadSpan>}
        <AddLeadLabel htmlFor="email">Email</AddLeadLabel>
        <AddLeadInput
          type="email"
          name="email"
          id="email"
          {...register("email", { required: true })}
        />
        {errors.email && <AddLeadSpan>Email is required</AddLeadSpan>}
        <AddLeadLabel htmlFor="phone">Phone</AddLeadLabel>
        <AddLeadInput
          type="number"
          name="phone"
          id="phone"
          {...register("phone", { required: true })}
        />
        {errors.phone && <AddLeadSpan>Phone is required</AddLeadSpan>}
        <AddLeadLabel htmlFor="description">Description</AddLeadLabel>
        <AddLeadTextarea
          type="description"
          name="description"
          id="description"
          {...register("description", { required: true })}
        />
        {errors.description && (
          <AddLeadSpan>Description is required</AddLeadSpan>
        )}
        <Button>Submit</Button>
      </AddLeadForm>
    </AddLeadWrapper>
  );
};

export default AddLead;
