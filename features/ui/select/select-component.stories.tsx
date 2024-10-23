import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import { SelectComponent } from "./select-component";

export default {
  title: "UI/Select",
  component: SelectComponent,
  argTypes: {},
  parameters: {
    layout: "fullscreen",
  },
} as Meta<typeof SelectComponent>;

const Template: StoryFn<typeof SelectComponent> = (args) => (
  <div style={{ padding: "20px" }}>
    {" "}
    {/* 20px padding everywhere, 40px on the right */}
    <SelectComponent {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {};
