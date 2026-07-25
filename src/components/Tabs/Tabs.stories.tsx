import type { Meta, StoryObj } from "@storybook/react";
import { Tabs } from "./Tabs";

const items = [
  { value: "overview", label: "Overview", content: "Project overview" },
  { value: "activity", label: "Activity", content: "Recent activity" },
  {
    value: "members",
    label: "Members",
    content: "Project members",
  },
];

const meta = {
  title: "Components/Navigation/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  args: { items },
  decorators: [
    (Story) => (
      <div style={{ width: 480 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithDisabledTab: Story = {
  args: {
    items: [
      ...items,
      { value: "admin", label: "Admin", content: "", disabled: true },
    ],
  },
};
