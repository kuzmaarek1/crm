import React from "react";
import { useTeams } from "../../../hooks/useTeams.js";
import { useForm } from "react-hook-form";
import { AddTeamWrapper, AddTeamHeader,  AddTeamForm, AddTeamLabel, AddTeamInput, AddTeamSpan, AddTeamTextarea  } from './AddTeam.styles.js';
import { Button } from "../../../components/Button/Button.js";

const AddTeam = () => {
const lead = useTeams();
 const {
  register,
  handleSubmit,
  formState: { errors },
} = useForm();
  return (
    <AddTeamWrapper>
      <AddTeamHeader>Add Teams</AddTeamHeader>
      <AddTeamForm onSubmit={handleSubmit(lead.addTeam)}>
      <AddTeamLabel htmlFor="name">Name</AddTeamLabel>
        <AddTeamInput
          type="text"
          name="name"
          id="name"
          {...register("name", { required: true })}
        />
        {errors.name && <AddTeamSpan> Name is required</AddTeamSpan>}
        <AddTeamLabel htmlFor="description">Description</AddTeamLabel>
        <AddTeamTextarea 
          type="description"
          name="description"
          id="description"
          {...register("description", { required: true })}
        />
        {errors.description && <AddTeamSpan>Description is required</AddTeamSpan>}
        <Button>Submit</Button>
      </AddTeamForm>
    </AddTeamWrapper>
  );
};

export default AddTeam;
