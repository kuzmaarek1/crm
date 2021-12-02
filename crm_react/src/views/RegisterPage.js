import React,{ useRef } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../hooks/useAuth.js";

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
    <div>
      <h1>Register Page</h1>
      <form onSubmit={handleSubmit(auth.signUp)}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          {...register("username", { required: true })}
        />
        {errors.email && <span>Email is required</span>}
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          {...register("password", { required: true })}
        />
        {errors.password && <span>Password is required</span>}
        <label htmlFor="password_repeat">Repeate password</label>
        <input
          type="password"
          name="password_repeat"
          id="password_repeat"
          {...register("password_repeat",{
             validate: value => 
             value === password.current || "The passwords do not match"
         })}
        />
        {errors.password_repeat && <spam>Hasła musza być takie same</spam>}
        <button>Submit</button>
      </form>
    </div>
  );
};

export default RegisterPage;
