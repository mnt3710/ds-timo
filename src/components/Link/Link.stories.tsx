import type { Meta, StoryObj } from "@storybook/react";
import { Link } from "./Link";

const meta = {
  title: "Components/Link",
  component: Link,
  tags: ["autodocs"],
  args: {
    href: "#",
    children: "View project",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["text", "button", "subtle"],
    },
  },
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Text: Story = {};
export const ButtonLink: Story = { args: { variant: "button" } };
export const External: Story = { args: { external: true } };
