import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../Button";
import { EmptyState } from "./EmptyState";

const meta = {
  title: "Components/Feedback/EmptyState",
  component: EmptyState,
  tags: ["autodocs"],
  args: {
    icon: "◇",
    title: "No projects yet",
    description: "Create your first project to start using TiMo.",
    action: <Button>Create project</Button>,
  },
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
