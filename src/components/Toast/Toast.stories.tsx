import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../Button";
import { Toast } from "./Toast";

const meta = {
  title: "Components/Feedback/Toast",
  component: Toast,
  tags: ["autodocs"],
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

const ToastDemo = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Show notification</Button>
      <Toast
        open={open}
        onOpenChange={setOpen}
        variant="success"
        title="Saved"
      >
        Your project settings were updated.
      </Toast>
    </>
  );
};

export const Default: Story = {
  args: {
    open: false,
    onOpenChange: () => undefined,
  },
  render: () => <ToastDemo />,
};
