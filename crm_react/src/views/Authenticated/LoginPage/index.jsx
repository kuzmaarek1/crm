import React from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "hooks/useAuth.js";
import { Button, Field } from "components";
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
        <Field
          type="email"
          name="email"
          watchName="username"
          watch={watch}
          errors={errors}
          register={register}
          required
        />
        <Field
          type="password"
          name="password"
          watchName="password"
          watch={watch}
          errors={errors}
          register={register}
          required
        />
        <Button>Login</Button>
      </Styles.Form>
    </Styles.Wrapper>
  );
};

export default LoginPage;
