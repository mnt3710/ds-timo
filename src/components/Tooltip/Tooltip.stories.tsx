import type { Meta, StoryObj } from "@storybook/react";
import { IconButton } from "../IconButton";
import { Tooltip } from "./Tooltip";

const meta = {
  title: "Components/Tooltip",
  component: Tooltip,
  tags: ["autodocs"],
  args: {
    content: "Add a new project",
    children: <IconButton aria-label="Add project">+</IconButton>,
  },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Top: Story = {};
export const Bottom: Story = { args: { placement: "bottom" } };
