import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../Button";
import { Popover } from "./Popover";
import { PopoverContent } from "./PopoverContent";
import { PopoverTrigger } from "./PopoverTrigger";

const meta = {
  title: "Components/Popover",
  component: Popover,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: null,
  },
  render: () => (
    <Popover>
      <PopoverTrigger>
        <Button variant="ghost">Open popover</Button>
      </PopoverTrigger>
      <PopoverContent style={{ width: 280, padding: 16 }}>
        <strong style={{ display: "block", marginBottom: 8 }}>
          Project details
        </strong>
        <p
          style={{
            color: "var(--color-text-secondary)",
            lineHeight: 1.5,
          }}
        >
          Popovers use the active theme and project accent colors.
        </p>
      </PopoverContent>
    </Popover>
  ),
};

export const EndAligned: Story = {
  args: {
    children: null,
  },
  render: () => (
    <div style={{ display: "flex", justifyContent: "flex-end", width: 360 }}>
      <Popover placement="bottom-end">
        <PopoverTrigger>
          <Button variant="ghost">More</Button>
        </PopoverTrigger>
        <PopoverContent style={{ width: 220, padding: 16 }}>
          Aligned to the end of its trigger.
        </PopoverContent>
      </Popover>
    </div>
  ),
};
