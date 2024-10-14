import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import { NewButton } from "./new-button";

export default {
  title: "UI/NewButton",
  component: NewButton,
  argTypes: {
    size: {
      control: {
        type: "select",
        options: ["sm", "md", "lg", "xlg"], // Directly using string literal types
      },
    },
    color: {
      control: {
        type: "select",
        options: [
          "primary",
          "secondary",
          "gray",
          "empty-gray",
          "error",
          "empty-error",
        ], // Directly using string literal types
      },
    },
    iconPosition: {
      control: {
        type: "select",
        options: ["before", "after", "only"], // Directly using string literal types for icon position
      },
    },

    state: {
      control: {
        type: "select",
        // options: ['default', 'hover', 'focused', 'disabled'], // Directly using string literal types for icon position
        options: ["default", "disabled"], // Directly using string literal types for icon position
      },
    },

    disabled: {
      control: "boolean",
    },
  },
  parameters: {
    layout: "fullscreen",
  },
} as Meta<typeof NewButton>;

const Template: StoryFn<typeof NewButton> = (args) => (
  <div style={{ padding: 20 }}>
    <NewButton {...args} /> {/* Passing args directly */}
  </div>
);

export const Default = Template.bind({});
Default.args = {
  size: "sm", // Using string literal values directly
  color: "primary",
  iconPosition: "before", // Add iconPosition here to set the initial value
  state: "default",
  disabled: false,
};
