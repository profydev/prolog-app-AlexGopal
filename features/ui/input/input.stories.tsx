import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import { Input } from "./input";

export default {
  title: "UI/Input",
  component: Input,
  argTypes: {},
  parameters: {
    layout: "fullscreen",
  },
} as Meta<typeof Input>;

const Template: StoryFn<typeof Input> = (args) => (
  <div style={{ padding: "20px" }}>
    {" "}
    {/* 20px padding everywhere, 40px on the right */}
    <Input {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {};
