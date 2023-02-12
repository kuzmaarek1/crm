import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "hooks/useAuth";
import { LoginForm, RegisterForm } from "constans";
import { Button, Field } from "components";
import * as Styles from "./styles";
import type {
  LoginValues,
  RegisterValues,
  ILoginForm,
  IRegisterForm,
} from "types";

const Auth = () => {
  const auth = useAuth();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<LoginValues | RegisterValues>();

  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [dataform, setFormData] = useState<ILoginForm[] | IRegisterForm[]>(
    LoginForm
  );

  const switchMode = () => {
    reset();
    setIsLogin((prevIsLogin) => !prevIsLogin);
  };

  useEffect(() => {
    setFormData(isLogin ? LoginForm : RegisterForm);
  }, [isLogin]);

  return (
    <Styles.Wrapper isLogin={isLogin}>
      <Styles.Header>{isLogin ? "Log In" : "Sign Up"}</Styles.Header>
      <Styles.Form
        onSubmit={
          isLogin
            ? handleSubmit(auth.handleSiginIn)
            : handleSubmit(async (register) => {
                await auth.handleSignUp(register);
                reset();
                setIsLogin(true);
              })
        }
      >
        {dataform.map((props, index) => (
          <Field<LoginValues | RegisterValues>
            key={index}
            {...props}
            watch={watch}
            errors={!!errors[props.name as keyof typeof errors]}
            register={register}
            validate={props.name === "re_password" ? watch("password") : false}
          />
        ))}
        <Styles.ButtonWrapper>
          <Button width="100%" height="40px" aria-label="login-or-signup">
            {isLogin ? " Log In" : "Sign Up"}
          </Button>
        </Styles.ButtonWrapper>
      </Styles.Form>
      <Styles.ButtonSwitchWrapper>
        <Button
          fontSmall={true}
          red
          height="40px"
          onClick={switchMode}
          aria-label="switch-button"
        >
          {isLogin
            ? "Don't have an account? Sign Up"
            : "Already have an account? Sign In"}
        </Button>
      </Styles.ButtonSwitchWrapper>
    </Styles.Wrapper>
  );
};

export default Auth;
