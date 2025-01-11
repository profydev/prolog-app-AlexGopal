import { Meta, StoryObj } from "@storybook/react";
import { Modal } from ".";

const meta: Meta<typeof Modal> = {
  title: "UI/Modal",
  component: Modal,
};

export default meta;

type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  args: {
    trigger: ({ open }) => <button onClick={open}>Open modal</button>,
    children: ({ close }) => <button onClick={close}>Close modal</button>,
  },
};
