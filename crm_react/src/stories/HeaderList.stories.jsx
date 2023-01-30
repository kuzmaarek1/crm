import React from "react";
import { useForm } from "react-hook-form";
import { HeaderList } from "components";

export default {
  title: "List Page/ Header List",
  component: HeaderList,
  argTypes: {
    setPage: { action: "setPage" },
    setModalIsOpenFormAdd: { action: "setModalIsOpenFormAdd" },
  },
};

const Template = (args) => {
  const { register, setFocus } = useForm();
  return <HeaderList register={register} setFocus={setFocus} {...args} />;
};

export const Lead = Template.bind({});
Lead.args = { header: "Lead" };

export const Team = Template.bind({});
Team.args = { header: "Team" };

export const Client = Template.bind({});
Client.args = { header: "Client" };
