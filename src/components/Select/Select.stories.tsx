import type { Meta, StoryObj } from "@storybook/react";
import { Select } from "./Select";

const projectOptions = [
  { value: "dig-vault", label: "dig-vault" },
  { value: "fillma", label: "fillma" },
  { value: "panora", label: "Panora" },
];

const meta = {
  title: "Components/Form/Select",
  component: Select,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    placeholder: "Select a project",
    options: projectOptions,
  },
  decorators: [
    (Story) => (
      <div style={{ width: 320 }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Invalid: Story = {
  args: {
    invalid: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const WithSelectedValue: Story = {
  args: {
    defaultValue: "fillma",
  },
};

export const WithDisabledOption: Story = {
  args: {
    options: [
      ...projectOptions,
      { value: "archived", label: "Archived project", disabled: true },
    ],
  },
};
