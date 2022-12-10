import React, { useEffect, useState } from "react";
import { useMatch } from "react-router-dom";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useLeads } from "hooks/useLeads.js";
import { useGetLeadsQuery } from "reducers/leadsApiSlice";
import { Button } from "components";
import * as Styles from "./styles";

const EditLead = () => {
  const leadHook = useLeads();
  const [lead, setLead] = useState(null);
  const teams = useSelector((state) => state.teams);
  const match = useMatch("/edit-lead/:id");
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { data: leads } = useGetLeadsQuery(teams.currentTeam.id);
  useEffect(() => {
    const findLeadById = leads.find(
      (lead) => String(lead.id) === String(match.params.id)
    );
    setLead(findLeadById);
    Object.entries(findLeadById).forEach(([key, value]) => {
      setValue(key, value);
    });
  }, []);

  return (
    <Styles.Wrapper>
      <Styles.Header>Edit Lead</Styles.Header>
      <Styles.Form
        onSubmit={handleSubmit((register) =>
          leadHook.handleEditLead(
            match.params.id,
            teams.currentTeam.id,
            register
          )
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
        <Styles.Label htmlFor="description">Assigned to</Styles.Label>
        <Styles.Select {...register("assigned_to")}>
          {!lead?.assigned_to && <option value="">None</option>}
          {teams?.currentTeam?.members?.map((member) => (
            <option value={member.username} key={member.id}>
              {member.username}
            </option>
          ))}
        </Styles.Select>
        <Button>Submit</Button>
      </Styles.Form>
    </Styles.Wrapper>
  );
};

export default EditLead;
