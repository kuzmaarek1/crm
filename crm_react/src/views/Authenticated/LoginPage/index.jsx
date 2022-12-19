import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "hooks/useAuth.js";
import { LoginForm, RegisterForm } from "constans";
import { Button, Field } from "components";
import * as Styles from "./styles";

const LoginPage = () => {
  const auth = useAuth();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const [isLogin, setIsLogin] = useState(true);
  const [dataform, setFormData] = useState(LoginForm);

  const switchMode = () => {
    reset();
    setIsLogin((prevIsLogin) => !prevIsLogin);
  };

  useEffect(() => {
    setFormData(isLogin ? LoginForm : RegisterForm);
  }, [isLogin]);

  return (
    <Styles.Wrapper>
      <Styles.Header>{isLogin ? "Login In" : "Sign Up"}</Styles.Header>
      <Styles.Form
        onSubmit={
          isLogin
            ? handleSubmit(auth.handleSiginIn)
            : handleSubmit(auth.handleSignUp)
        }
      >
        {dataform.map((props, index) => (
          <Field
            key={index}
            {...props}
            watch={watch}
            errors={errors}
            register={register}
            required
          />
        ))}
        <Styles.ButtonWrapper>
          <Button width="100%" height="40px">
            {isLogin ? " Log In" : "Sign Up"}
          </Button>
        </Styles.ButtonWrapper>
      </Styles.Form>
      <Styles.ButtonSwitchWrapper>
        <Button
          fontSmall={true}
          red
          width="100%"
          height="40px"
          onClick={switchMode}
        >
          {isLogin
            ? "Don't have an account? Sign Up"
            : "Already have an account? Sign In"}
        </Button>
      </Styles.ButtonSwitchWrapper>
    </Styles.Wrapper>
  );
};

export default LoginPage;
