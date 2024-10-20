import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import { Checkbox } from "./checkbox";

export default {
  title: "UI/Checkbox",
  component: Checkbox,
  argTypes: {
    size: {
      control: {
        type: "select",
        options: ["sm", "md"], // Directly using string literal types
      },
    },
    state: {
      control: {
        type: "select",
        options: ["checked", "unchecked", "indeterminate"], // Directly using string literal types
      },
    },
    disabled: {
      control: "boolean",
    },
  },
} as Meta<typeof Checkbox>;

const Template: StoryFn<typeof Checkbox> = (args) => (
  <div style={{ padding: 20 }}>
    <Checkbox {...args} /> {/* Passing args directly */}
  </div>
);

export const Default = Template.bind({});
Default.args = {
  size: "sm", // Using string literal values directly
  state: "checked",
  disabled: false,
};
