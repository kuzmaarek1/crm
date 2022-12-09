import React from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useLeads } from "hooks/useLeads.js";
import { Button } from "components";
import * as Styles from "./styles";

const AddLead = () => {
  const lead = useLeads();
  const teams = useSelector((state) => state.teams);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return (
    <Styles.Wrapper>
      <Styles.Header>Add Lead</Styles.Header>
      <Styles.Form
        onSubmit={handleSubmit((register) =>
          lead.handleAddLead(teams.currentTeam.id, register)
        )}
      >
        <Styles.Label htmlFor="first_name">First name</Styles.Label>
        <Styles.Input
          type="text"
          name="first_name"
          id="first_name"
          {...register("first_name", { required: true })}
        />
        {errors.first_name && <Styles.Span>First name is required</Styles.Span>}
        <Styles.Label htmlFor="last_name">Last name</Styles.Label>
        <Styles.Input
          type="text"
          name="last_name"
          id="last_name"
          {...register("last_name", { required: true })}
        />
        {errors.last_name && <Styles.Span>Last name is required</Styles.Span>}
        <Styles.Label htmlFor="email">Email</Styles.Label>
        <Styles.Input
          type="email"
          name="email"
          id="email"
          {...register("email", { required: true })}
        />
        {errors.email && <Styles.Span>Email is required</Styles.Span>}
        <Styles.Label htmlFor="phone">Phone</Styles.Label>
        <Styles.Input
          type="number"
          name="phone"
          id="phone"
          {...register("phone", { required: true })}
        />
        {errors.phone && <Styles.Span>Phone is required</Styles.Span>}
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

export default AddLead;
