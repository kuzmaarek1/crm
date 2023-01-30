import React from "react";
import { useForm } from "react-hook-form";
import { useArgs } from "@storybook/client-api";
import { ModalDetails } from "components";
import { persons, teams } from "./data";
import { teamsApiSlice } from "reducers/teamsApiSlice";
import { clientsApiSlice } from "reducers/clientsApiSlice";
import { leadsApiSlice } from "reducers/leadsApiSlice";

const endpointTeams = teamsApiSlice;
const endpointClients = clientsApiSlice;
const endpointLeads = leadsApiSlice;

export default {
  title: "Modals/Modal Details",
  component: ModalDetails,
  argTypes: {
    modalIsOpen: {
      control: "boolean",
      defaultValue: true,
      table: { type: { summary: "boolean" }, defaultValue: { summary: true } },
    },
    setPage: { action: "action" },
  },
  parameters: {
    docs: {
      inlineStories: false,
      iframeHeight: 500,
    },
  },
};

const Template = (args) => {
  const [_, updateArgs] = useArgs();
  const { resetField } = useForm();
  return (
    <ModalDetails
      {...args}
      closeModal={() => updateArgs({ ...args, modalIsOpen: false })}
      teams={{ currentTeam: { members: [{ username: "akuzma2@gmail.com" }] } }}
      resetSearch={resetField}
    />
  );
};

export const Lead = Template.bind({});
Lead.args = {
  header: "Lead",
  hook: {
    handleConvertToClient: () => {},
    handleEdit: () => {},
    handleDelete: () => {},
  },
  list: persons[0],
  endpoint: endpointLeads,
};

export const Team = Template.bind({});
Team.args = {
  header: "Team",
  hook: {
    handleAddMember: () => {},
    handleEdit: () => {},
    handleDelete: () => {},
  },
  list: teams[0],
  endpoint: endpointTeams,
};

export const Client = Template.bind({});
Client.args = {
  header: "Client",
  hook: {
    handleEdit: () => {},
    handleDelete: () => {},
  },
  list: persons[0],
  endpoint: endpointClients,
};
