import React from "react";
import { ButtonTeamList } from "components";
import { useArgs } from "@storybook/client-api";
import { action } from "@storybook/addon-actions";

export default {
  title: "Buttons/Button List ",
  component: ButtonTeamList,
  argTypes: {
    setPage: { action: "setPage" },
  },
};

const Template = (args) => {
  const [_, updateArgs] = useArgs();
  return (
    <ButtonTeamList
      {...args}
      hook={{
        handleChangeTeams: (e) => {
          action("handleChangeTeam")(e);
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
