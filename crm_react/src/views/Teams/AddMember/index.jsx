import React, { useRef } from "react";
import { useNavigate, useMatch } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useTeams } from "hooks/useTeams.js";
import { Button } from "components";
import * as Styles from "./styles";

const AddLead = () => {
  const navigate = useNavigate();
  const match = useMatch("/add-member/:id");
  const teamHook = useTeams();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const password = useRef({});
  password.current = watch("password", "");
  return (
    <Styles.Wrapper>
      <Styles.Header>Add Members</Styles.Header>
      <Styles.Form
        onSubmit={handleSubmit((register) => {
          teamHook.handleAddMember(match.params.id, register);
          navigate("/teams");
        })}
      >
        <Styles.Label htmlFor="email">Email</Styles.Label>
        <Styles.Input
          type="email"
          name="email"
          id="email"
          {...register("username", { required: true })}
        />
        {errors.username && <Styles.Span>Email is required</Styles.Span>}
        <Button>Submit</Button>
      </Styles.Form>
    </Styles.Wrapper>
  );
};

export default AddLead;
