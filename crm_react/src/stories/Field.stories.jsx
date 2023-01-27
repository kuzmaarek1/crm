import React from "react";
import { useForm } from "react-hook-form";
import { Field } from "components";
import GlobalStyle from "theme/GlobalStyle";

export default {
  title: "Field",
  component: Field,
};

const Template = (args) => {
  const { register, watch } = useForm();
  return (
    <>
      <GlobalStyle />
      <Field
        watch={watch}
        register={register}
        required
        type="email"
        name="username"
        {...args}
      />
    </>
  );
};

export const Grey = Template.bind({});
Grey.args = { errors: { username: false } };

export const Red = Template.bind({});
Red.args = { errors: { username: true } };
