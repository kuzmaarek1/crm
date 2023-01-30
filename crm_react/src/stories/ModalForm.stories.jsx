import React from "react";
import { useForm } from "react-hook-form";
import { useArgs } from "@storybook/client-api";
import { ModalForm } from "components";
import { persons, teams } from "./data";
import { teamsApiSlice } from "reducers/teamsApiSlice";
import { clientsApiSlice } from "reducers/clientsApiSlice";
import { leadsApiSlice } from "reducers/leadsApiSlice";

const endpointTeams = teamsApiSlice;
const endpointClients = clientsApiSlice;
const endpointLeads = leadsApiSlice;

export default {
  title: "Modals/Modal From",
  component: ModalForm,
  argTypes: {
    modalIsOpen: {
      control: "boolean",
      defaultValue: true,
      table: { type: { summary: "boolean" }, defaultValue: { summary: true } },
    },
    setPage: { action: "subimt" },
  },
  parameters: {
    docs: {
      inlineStories: false,
      iframeHeight: 600,
    },
  },
};

const Template = (args) => {
  const [_, updateArgs] = useArgs();
  const { resetField } = useForm();
  return (
    <ModalForm
      {...args}
      closeModal={() => updateArgs({ ...args, modalIsOpen: false })}
      teams={{ currentTeam: { members: [{ username: "akuzma2@gmail.com" }] } }}
      resetSearch={resetField}
    />
  );
};

export const AddLead = Template.bind({});
AddLead.args = {
  header: "Lead",
  hook: {
    handleAdd: () => {},
  },
  endpoint: endpointLeads,
};

export const AddTeam = Template.bind({});
AddTeam.args = {
  header: "Team",
  hook: {
    handleAdd: () => {},
  },
  endpoint: endpointTeams,
};

export const AddClient = Template.bind({});
AddClient.args = {
  header: "Client",
  hook: {
    handleAdd: () => {},
  },
  endpoint: endpointClients,
};

export const AddMember = Template.bind({});
AddMember.args = {
  header: "Team",
  hook: {
    handleAddMember: () => {},
  },
  list: teams[0],
  endpoint: endpointTeams,
  addMember: true,
  closeDetails: () => {},
};

export const EditLead = Template.bind({});
EditLead.args = {
  header: "Lead",
  list: persons[0],
  hook: {
    handleEdit: () => {},
  },
  endpoint: endpointLeads,
  closeDetails: () => {},
};

export const EditTeam = Template.bind({});
EditTeam.args = {
  header: "Team",
  list: teams[0],
  hook: {
    handleEdit: () => {},
  },
  endpoint: endpointTeams,
  closeDetails: () => {},
};

export const EditClient = Template.bind({});
EditClient.args = {
  header: "Client",
  list: persons[0],
  hook: {
    handleEdit: () => {},
  },
  endpoint: endpointClients,
  closeDetails: () => {},
};
