import type { Meta, StoryObj } from "@storybook/react";
import { Progress } from "./Progress";

const meta = {
  title: "Components/Feedback/Progress",
  component: Progress,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ width: 360 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Determinate: Story = {
  args: { value: 64, label: "Uploading assets", showValue: true },
};
export const Indeterminate: Story = {
  args: { label: "Preparing project" },
};
