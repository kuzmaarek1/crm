import React from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useAuth } from "../hooks/useAuth.js";

const LoginPage = () => {
  const auth = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return (
    <div>
      <h1>Login Page</h1>
      <form onSubmit={handleSubmit(auth.loginIn)}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          {...register("username", { required: true })}
        />
        {errors.login && <span>Login is required</span>}
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          {...register("password", { required: true })}
        />
        {errors.password && <span>Password is required</span>}
        <button>Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
