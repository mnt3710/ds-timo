import type { Meta, StoryObj } from "@storybook/react";
import { Alert } from "./Alert";

const meta = {
  title: "Components/Feedback/Alert",
  component: Alert,
  tags: ["autodocs"],
  args: {
    title: "Project updated",
    children: "Your changes have been saved.",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["info", "success", "warning", "error"],
    },
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Info: Story = {};
export const Success: Story = { args: { variant: "success" } };
export const Warning: Story = { args: { variant: "warning" } };
export const Error: Story = { args: { variant: "error" } };
