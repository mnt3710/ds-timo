import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../Button";
import { FormField } from "../FormField";
import { Input } from "../Input";
import { ThemeProvider } from "./ThemeProvider";

const meta = {
  title: "Foundation/ThemeProvider",
  component: ThemeProvider,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ThemeProvider>;

export default meta;
type Story = StoryObj<typeof meta>;

const content = (
  <div style={{ display: "grid", gap: 24, maxWidth: 360 }}>
    <div>
      <h2 style={{ marginBottom: 8 }}>Project settings</h2>
      <p style={{ color: "var(--color-text-secondary)" }}>
        Theme colors flow through every component.
      </p>
    </div>
    <FormField label="Project name" required>
      <Input defaultValue="TiMo project" />
    </FormField>
    <Button>Save changes</Button>
  </div>
);

export const Light: Story = {
  args: {
    theme: "light",
    children: content,
  },
  decorators: [
    (Story) => (
      <div style={{ minHeight: "100vh" }}>
        <Story />
      </div>
    ),
  ],
  render: (args) => (
    <ThemeProvider {...args} style={{ minHeight: "100vh", padding: 48 }} />
  ),
};

export const Dark: Story = {
  ...Light,
  args: {
    theme: "dark",
    children: content,
  },
};

export const CustomProjectColor: Story = {
  ...Light,
  args: {
    theme: "light",
    accent: {
      primary: "#DA6E55",
      active: "#B95743",
      subtle: "#F5D8D1",
      foreground: "#142328",
    },
    children: content,
  },
};
