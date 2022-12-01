import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useMatch } from "react-router-dom";
import { useClients } from "hooks/useClients.js";
import { useForm } from "react-hook-form";
import { Button } from "components/Button/Button.js";
import {
  EditClientWrapper,
  EditClientHeader,
  EditClientForm,
  EditClientLabel,
  EditClientInput,
  EditClientSpan,
  EditClientTextarea,
  EditClientSelect,
} from "./EditClient.styles.js";

const EditClient = () => {
  const clientHook = useClients();
  const clients = useSelector((state) => state.clients);
  const [client, setClient] = useState(null);
  const teams = useSelector((state) => state.teams);
  const match = useMatch("/edit-client/:id");
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const findClientById = clients?.clientsData?.find(
      (client) => String(client.id) === String(match.params.id)
    );
    setClient(findClientById);
    Object.entries(findClientById).forEach(([key, value]) => {
      setValue(key, value);
    });
  }, []);

  return (
    <EditClientWrapper>
      <EditClientHeader>Edit Client</EditClientHeader>
      <EditClientForm
        onSubmit={handleSubmit((register) =>
          clientHook.handleEditClient(
            match.params.id,
            teams.currentTeam.id,
            register
          )
        )}
      >
        <EditClientLabel htmlFor="first_name">First name</EditClientLabel>
        <EditClientInput
          type="text"
          name="first_name"
          id="first_name"
          {...register("first_name", { required: true })}
        />
        {errors.first_name && (
          <EditClientSpan>First name is required</EditClientSpan>
        )}
        <EditClientLabel htmlFor="last_name">Last name</EditClientLabel>
        <EditClientInput
          type="text"
          name="last_name"
          id="last_name"
          {...register("last_name", { required: true })}
        />
        {errors.last_name && (
          <EditClientSpan>Last name is required</EditClientSpan>
        )}
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
        {errors.description && (
          <EditClientSpan>Description is required</EditClientSpan>
        )}
        <EditClientLabel htmlFor="description">Assigned to</EditClientLabel>
        <EditClientSelect {...register("assigned_to")}>
          {!client?.assigned_to && <option value="">None</option>}
          {teams?.currentTeam?.members?.map((member) => (
            <option value={member.username} key={member.id}>
              {member.username}
            </option>
          ))}
        </EditClientSelect>
        <Button>Submit</Button>
      </EditClientForm>
    </EditClientWrapper>
  );
};

export default EditClient;
