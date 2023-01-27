import React from "react";
import { ButtonTeamList } from "components";

export default {
  title: "ButtonTeamList ",
  component: ButtonTeamList,
  argTypes: {
    setPage: { action: "handleChangeTeam" },
  },
};

const Template = (args) => (
  <ButtonTeamList
    {...args}
    hook={{
      handleChangeTeams: () => {},
    }}
    teams={{ currentTeam: { id: 1 } }}
  />
);

export const Current = Template.bind({});
Current.args = { id: 1 };

export const Activate = Template.bind({});
Activate.args = { id: 2 };
