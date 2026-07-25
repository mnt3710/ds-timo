import type { Meta, StoryObj } from "@storybook/react";
import { Skeleton } from "./Skeleton";

const meta = {
  title: "Components/Feedback/Skeleton",
  component: Skeleton,
  tags: ["autodocs"],
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TextLine: Story = { args: { width: 280, height: 16 } };
export const Card: Story = {
  args: { width: 320, height: 160, radius: "md" },
};
export const Avatar: Story = {
  args: { width: 48, height: 48, radius: "pill" },
};
