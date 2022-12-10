import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "hooks/useAuth.js";
import { Button } from "components";
import * as Styles from "./styles";

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
    <Styles.Wrapper>
      <Styles.Header>Register Page</Styles.Header>
      <Styles.Form onSubmit={handleSubmit(auth.handleSignUp)}>
        <Styles.Label htmlFor="email">Email</Styles.Label>
        <Styles.Input
          type="email"
          name="email"
          id="email"
          {...register("username", { required: true })}
        />
        {errors.username && <Styles.Span>Email is required</Styles.Span>}
        <Styles.Label htmlFor="password">Password</Styles.Label>
        <Styles.Input
          type="password"
          name="password"
          id="password"
          {...register("password", { required: true })}
        />
        {errors.password && <Styles.Span>Password is required</Styles.Span>}
        <Styles.Label htmlFor="password_repeat">Repeate password</Styles.Label>
        <Styles.Input
          type="password"
          name="password_repeat"
          id="password_repeat"
          {...register("password_repeat", {
            validate: (value) =>
              value === password.current || "The passwords do not match",
          })}
        />
        {errors.password_repeat && (
          <Styles.Span>The passwords must be identical</Styles.Span>
        )}
        <Button>Submit</Button>
      </Styles.Form>
    </Styles.Wrapper>
  );
};

export default RegisterPage;
