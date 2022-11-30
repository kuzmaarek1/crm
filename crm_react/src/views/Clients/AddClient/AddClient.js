import React from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useClients } from "hooks/useClients.js";
import { Button } from "components/Button/Button.js";
import {
  AddClientWrapper,
  AddClientHeader,
  AddClientForm,
  AddClientLabel,
  AddClientInput,
  AddClientSpan,
  AddClientTextarea,
} from "./AddClient.styles.js";

const AddClient = () => {
  const client = useClients();
  const teams = useSelector((state) => state.teams);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return (
    <AddClientWrapper>
      <AddClientHeader>Add Client</AddClientHeader>
      <AddClientForm
        onSubmit={handleSubmit((register) =>
          client.handleAddClient(teams.currentTeam.id, register)
        )}
      >
        <AddClientLabel htmlFor="first_name">First name</AddClientLabel>
        <AddClientInput
          type="text"
          name="first_name"
          id="first_name"
          {...register("first_name", { required: true })}
        />
        {errors.first_name && (
          <AddClientSpan>First name is required</AddClientSpan>
        )}
        <AddClientLabel htmlFor="last_name">Last name</AddClientLabel>
        <AddClientInput
          type="text"
          name="last_name"
          id="last_name"
          {...register("last_name", { required: true })}
        />
        {errors.last_name && (
          <AddClientSpan>Last name is required</AddClientSpan>
        )}
        <AddClientLabel htmlFor="email">Email</AddClientLabel>
        <AddClientInput
          type="email"
          name="email"
          id="email"
          {...register("email", { required: true })}
        />
        {errors.email && <AddClientSpan>Email is required</AddClientSpan>}
        <AddClientLabel htmlFor="phone">Phone</AddClientLabel>
        <AddClientInput
          type="number"
          name="phone"
          id="phone"
          {...register("phone", { required: true })}
        />
        {errors.phone && <AddClientSpan>Phone is required</AddClientSpan>}
        <AddClientLabel htmlFor="description">Description</AddClientLabel>
        <AddClientTextarea
          type="description"
          name="description"
          id="description"
          {...register("description", { required: true })}
        />
        {errors.description && (
          <AddClientSpan>Description is required</AddClientSpan>
        )}
        <Button>Submit</Button>
      </AddClientForm>
    </AddClientWrapper>
  );
};

export default AddClient;
