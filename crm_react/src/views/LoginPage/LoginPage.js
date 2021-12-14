import React from "react";
import { LoginPageWrapper, LoginHeader,  LoginForm, LoginLabel, LoginInput, LoginSpan } from './LoginPage.styles.js';
import { useForm } from "react-hook-form";
import { Button } from "../../components/atoms/Button/Button.js";
import { useAuth } from "../../hooks/useAuth.js";

const LoginPage = () => {
  const auth = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return (
    <LoginPageWrapper>
      <LoginHeader>Login In</LoginHeader>
      <LoginForm onSubmit={handleSubmit(auth.loginIn)}>
        <LoginLabel htmlFor="email">Email</LoginLabel>
        <LoginInput
          type="email"
          name="email"
          id="email"
          {...register("username", { required: true })}
        />
        {errors.username && <LoginSpan>Login is required</LoginSpan>}
        <LoginLabel htmlFor="password">Password</LoginLabel>
        <LoginInput
          type="password"
          name="password"
          id="password"
          {...register("password", { required: true })}
        />
        {errors.password && <LoginSpan>Password is required</LoginSpan>}
        <Button>Login</Button>
      </LoginForm>
    </LoginPageWrapper>
  );
};

export default LoginPage;
