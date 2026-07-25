import type { Meta, StoryObj } from "@storybook/react";
import { Slider } from "./Slider";

const meta = {
  title: "Components/Form/Slider",
  component: Slider,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ width: 360 }}>
        <Story />
      </div>
    ),
  ],
  args: {
    min: 0,
    max: 100,
    defaultValue: 40,
    showValue: true,
  },
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Price: Story = {
  args: {
    max: 500,
    defaultValue: 120,
    formatValue: (value) => `$${value}`,
  },
};
export const Disabled: Story = { args: { disabled: true } };
