import React from "react";
import { Button } from "components";

export default {
  title: "Button",
  component: Button,
  argTypes: {
    team: { control: "boolean" },
    width: { control: "text" },
    height: { control: "text" },
    fontSmall: { control: "boolean" },
  },
};

const Template = (args) => (
  <Button width="50vw" height="40px" {...args}>
    Button
  </Button>
);

export const Blue = Template.bind({});
Blue.args = {};

export const Red = Template.bind({});
Red.args = { red: true };
