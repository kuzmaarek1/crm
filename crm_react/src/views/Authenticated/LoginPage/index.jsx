import React from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "hooks/useAuth.js";
import { Button } from "components";
import * as Styles from "./styles";

const LoginPage = () => {
  const auth = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return (
    <Styles.Wrapper>
      <Styles.Header>Login In</Styles.Header>
      <Styles.Form onSubmit={handleSubmit(auth.handleSiginIn)}>
        <Styles.Label htmlFor="email">Email</Styles.Label>
        <Styles.Input
          type="email"
          name="email"
          id="email"
          {...register("username", { required: true })}
        />
        {errors.username && <Styles.Span>Login is required</Styles.Span>}
        <Styles.Label htmlFor="password">Password</Styles.Label>
        <Styles.Input
          type="password"
          name="password"
          id="password"
          {...register("password", { required: true })}
        />
        {errors.password && <Styles.Span>Password is required</Styles.Span>}
        <Button>Login</Button>
      </Styles.Form>
    </Styles.Wrapper>
  );
};

export default LoginPage;
