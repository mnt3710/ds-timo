import type { Meta, StoryObj } from "@storybook/react";
import { Radio } from "./Radio";

const meta = {
  title: "Components/Form/Radio",
  component: Radio,
  tags: ["autodocs"],
  args: {
    name: "plan",
    label: "Standard plan",
    description: "For personal TiMo projects.",
    value: "standard",
  },
} satisfies Meta<typeof Radio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Selected: Story = { args: { defaultChecked: true } };
export const Disabled: Story = { args: { disabled: true } };
