// import React from "react";
// import { Meta, StoryFn } from "@storybook/react";
// import { Alert } from "./alert"; // Ensure the path is correct

// // Define metadata for the Alert component
// export default {
//   title: "UI/Alert",
//   component: Alert, // Reference the Alert component here
//   parameters: {
//     layout: "fullscreen", // You can adjust this layout or remove it if not needed
//   },
// } as Meta<typeof Alert>;

// // Template for the Alert component
// const Template: StoryFn<typeof Alert> = () => <Alert />;

// // Default story instance for Alert
// export const Default = Template.bind({});

// // You can specify additional parameters for the story if needed
// Default.parameters = {
//   viewMode: "docs",
// };

import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import { Alert } from "."; // Ensure the import path is correct

export default {
  title: "UI/Alert",
  component: Alert,
  parameters: {
    layout: "fullscreen",
  },
} as Meta<typeof Alert>;

// Template for the Alert component with args
const Template: StoryFn<typeof Alert> = (args) => <Alert {...args} />;

export const Default = Template.bind({});

// Provide default values for props in the Default story
Default.args = {
  children: "This is an alert message!", // Providing the 'children' prop
  variant: "outlined", // Optional prop (if your component uses it)
  severity: "error", // Optional prop (if your component uses it)
  onActionClick: () => alert("Action button clicked!"),
};
