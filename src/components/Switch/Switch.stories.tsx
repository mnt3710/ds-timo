import type { Meta, StoryObj } from "@storybook/react";
import { Switch } from "./Switch";

const meta = {
  title: "Components/Form/Switch",
  component: Switch,
  tags: ["autodocs"],
  args: {
    label: "Dark mode",
    description: "Use the dark appearance for this project.",
  },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Off: Story = {};
export const On: Story = { args: { defaultChecked: true } };
export const Disabled: Story = { args: { disabled: true } };
