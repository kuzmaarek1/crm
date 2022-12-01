import React, { useRef } from "react";
import { useNavigate, useMatch } from "react-router-dom";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Button } from "components/Button/Button.js";
import { useTeams } from "hooks/useTeams.js";
import {
  AddMemberWrapper,
  AddMemberHeader,
  AddMemberForm,
  AddMemberLabel,
  AddMemberInput,
  AddMemberSpan,
} from "./AddMember.styles.js";

const AddLead = () => {
  const navigate = useNavigate();
  const match = useMatch("/add-member/:id");
  const teams = useSelector((state) => state.teams);
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
    <AddMemberWrapper>
      <AddMemberHeader>Add Members</AddMemberHeader>
      <AddMemberForm
        onSubmit={handleSubmit((register) => {
          teamHook.handleAddMember(register, match.params.id);
          navigate("/teams");
        })}
      >
        <AddMemberLabel htmlFor="email">Email</AddMemberLabel>
        <AddMemberInput
          type="email"
          name="email"
          id="email"
          {...register("username", { required: true })}
        />
        {errors.username && <AddMemberSpan>Email is required</AddMemberSpan>}
        <AddMemberLabel htmlFor="password">Password</AddMemberLabel>
        <AddMemberInput
          type="password"
          name="password"
          id="password"
          {...register("password", { required: true })}
        />
        {errors.password && <AddMemberSpan>Password is required</AddMemberSpan>}
        <AddMemberLabel htmlFor="password_repeat">
          Repeate password
        </AddMemberLabel>
        <AddMemberInput
          type="password"
          name="password_repeat"
          id="password_repeat"
          {...register("password_repeat", {
            validate: (value) =>
              value === password.current || "The passwords do not match",
          })}
        />
        {errors.password_repeat && (
          <AddMemberSpan>The passwords must be identical</AddMemberSpan>
        )}
        <Button>Submit</Button>
      </AddMemberForm>
    </AddMemberWrapper>
  );
};

export default AddLead;
