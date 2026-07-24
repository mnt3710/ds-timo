import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../Button";
import { Input } from "../Input";
import { Select } from "../Select";
import { Textarea } from "../Textarea";
import { FormField } from "./FormField";

const meta = {
  title: "Components/Form/FormField",
  component: FormField,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ width: 360 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof FormField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithInput: Story = {
  args: {
    label: "Email address",
    helperText: "We will only use this for account notifications.",
    required: true,
    children: <Input type="email" placeholder="name@example.com" />,
  },
};

export const WithError: Story = {
  args: {
    label: "Display name",
    error: "Enter at least three characters.",
    required: true,
    children: <Input defaultValue="Ti" />,
  },
};

export const OptionalTextarea: Story = {
  args: {
    label: "Notes",
    helperText: "Add any context that may be useful.",
    children: <Textarea placeholder="Write a note" />,
  },
};

export const CompleteForm: Story = {
  args: {
    label: "Example",
    children: <Input />,
  },
  render: () => (
    <form
      onSubmit={(event) => event.preventDefault()}
      style={{ display: "grid", gap: 24 }}
    >
      <FormField
        label="Project name"
        helperText="Use a short, recognizable name."
        required
      >
        <Input name="projectName" placeholder="My project" />
      </FormField>
      <FormField label="Product" required>
        <Select name="product" placeholder="Select a product">
          <option value="dig-vault">dig-vault</option>
          <option value="fillma">fillma</option>
          <option value="panora">Panora</option>
        </Select>
      </FormField>
      <FormField label="Description" optionalText="Optional">
        <Textarea name="description" placeholder="What is this project for?" />
      </FormField>
      <Button type="submit">Create project</Button>
    </form>
  ),
};
