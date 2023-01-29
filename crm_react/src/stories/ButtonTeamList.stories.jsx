import React from "react";
import { ButtonTeamList } from "components";
import { useArgs } from "@storybook/client-api";

export default {
  title: "Buttons/ButtonList ",
  component: ButtonTeamList,
  argTypes: {
    setPage: { action: "handleChangeTeam" },
  },
};

const Template = (args) => {
  const [_, updateArgs] = useArgs();
  return (
    <ButtonTeamList
      {...args}
      hook={{
        handleChangeTeams: () => {
          updateArgs({ ...args, id: 1 });
        },
      }}
      teams={{ currentTeam: { id: 1 } }}
    />
  );
};

export const Current = Template.bind({});
Current.args = { id: 1 };

export const Activate = Template.bind({});
Activate.args = { id: 2 };
