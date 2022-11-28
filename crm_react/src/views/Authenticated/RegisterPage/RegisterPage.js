import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import {
  RegisterPageWrapper,
  RegisterHeader,
  RegisterForm,
  RegisterLabel,
  RegisterInput,
  RegisterSpan,
} from "./RegisterPage.styles.js";
import { Button } from "components/Button/Button.js";
import { useAuth } from "hooks/useAuth.js";

const RegisterPage = () => {
  const auth = useAuth();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const password = useRef({});
  password.current = watch("password", "");
  return (
    <RegisterPageWrapper>
      <RegisterHeader>Register Page</RegisterHeader>
      <RegisterForm onSubmit={handleSubmit(auth.signUp)}>
        <RegisterLabel htmlFor="email">Email</RegisterLabel>
        <RegisterInput
          type="email"
          name="email"
          id="email"
          {...register("username", { required: true })}
        />
        {errors.username && <RegisterSpan>Email is required</RegisterSpan>}
        <RegisterLabel htmlFor="password">Password</RegisterLabel>
        <RegisterInput
          type="password"
          name="password"
          id="password"
          {...register("password", { required: true })}
        />
        {errors.password && <RegisterSpan>Password is required</RegisterSpan>}
        <RegisterLabel htmlFor="password_repeat">
          Repeate password
        </RegisterLabel>
        <RegisterInput
          type="password"
          name="password_repeat"
          id="password_repeat"
          {...register("password_repeat", {
            validate: (value) =>
              value === password.current || "The passwords do not match",
          })}
        />
        {errors.password_repeat && (
          <RegisterSpan>The passwords must be identical</RegisterSpan>
        )}
        <Button>Submit</Button>
      </RegisterForm>
    </RegisterPageWrapper>
  );
};

export default RegisterPage;
