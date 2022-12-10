import React from "react";
import { useTeams } from "hooks/useTeams.js";
import { useForm } from "react-hook-form";
import { Button } from "components";
import * as Styles from "./styles.jsx";

const AddTeam = () => {
  const teams = useTeams();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return (
    <Styles.Wrapper>
      <Styles.Header>Add Teams</Styles.Header>
      <Styles.Form onSubmit={handleSubmit(teams.handleAddTeam)}>
        <Styles.Label htmlFor="name">Name</Styles.Label>
        <Styles.Input
          type="text"
          name="name"
          id="name"
          {...register("name", { required: true })}
        />
        {errors.name && <Styles.Span> Name is required</Styles.Span>}
        <Styles.Label htmlFor="description">Description</Styles.Label>
        <Styles.Textarea
          type="description"
          name="description"
          id="description"
          {...register("description", { required: true })}
        />
        {errors.description && (
          <Styles.Span>Description is required</Styles.Span>
        )}
        <Button>Submit</Button>
      </Styles.Form>
    </Styles.Wrapper>
  );
};

export default AddTeam;
