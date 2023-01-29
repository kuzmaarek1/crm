import React from "react";
import { useForm } from "react-hook-form";
import { Field } from "components";

export default {
  title: "Field",
  component: Field,
  argTypes: {
    textarea: { control: "boolean" },
  },
};

const Template = (args) => {
  const { register, watch } = useForm();
  return (
    <Field
      watch={watch}
      register={register}
      required
      type="email"
      name="username"
      {...args}
    />
  );
};

export const Grey = Template.bind({});
Grey.args = { errors: { username: false } };

export const Red = Template.bind({});
Red.args = { errors: { username: true } };
