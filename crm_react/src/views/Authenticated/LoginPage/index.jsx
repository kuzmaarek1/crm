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
    watch,
    formState: { errors },
  } = useForm();
  return (
    <Styles.Wrapper>
      <Styles.Header>Login In</Styles.Header>
      <Styles.Form onSubmit={handleSubmit(auth.handleSiginIn)}>
        <Styles.FieldWrapper>
          <Styles.Input
            type="email"
            name="email"
            id="email"
            {...register("username", { required: true })}
            empty={watch("username")}
            error={errors.username}
          />
          <Styles.Label
            htmlFor="email"
            empty={watch("username") === undefined || watch("username") === ""}
            error={errors.username}
          >
            Email
          </Styles.Label>
          {errors.username && <Styles.Span>Login is required</Styles.Span>}
        </Styles.FieldWrapper>
        <Styles.FieldWrapper>
          <Styles.Input
            type="password"
            name="password"
            id="password"
            {...register("password", { required: true })}
            empty={watch("password") === undefined || watch("password") === ""}
            error={errors.password}
          />
          <Styles.Label
            htmlFor="password"
            empty={watch("password") === undefined || watch("password") === ""}
            error={errors.password}
          >
            Password
          </Styles.Label>
          {errors.password && <Styles.Span>Password is required</Styles.Span>}
        </Styles.FieldWrapper>
        <Button>Login</Button>
      </Styles.Form>
    </Styles.Wrapper>
  );
};

export default LoginPage;
