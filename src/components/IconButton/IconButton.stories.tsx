import type { Meta, StoryObj } from "@storybook/react";
import { IconButton } from "./IconButton";

const meta = {
  title: "Components/IconButton",
  component: IconButton,
  tags: ["autodocs"],
  args: {
    "aria-label": "Add item",
    children: "+",
  },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Ghost: Story = {};
export const Primary: Story = { args: { variant: "primary" } };
export const Disabled: Story = { args: { disabled: true } };
