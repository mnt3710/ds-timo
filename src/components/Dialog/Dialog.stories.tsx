import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../Button";
import { Dialog } from "./Dialog";

const meta = {
  title: "Components/Dialog",
  component: Dialog,
  tags: ["autodocs"],
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

const DialogDemo = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open dialog</Button>
      <Dialog
        open={open}
        onOpenChange={setOpen}
        title="Delete project?"
        description="This action cannot be undone."
        footer={
          <>
            <Button variant="ghost" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setOpen(false)}>Delete</Button>
          </>
        }
      >
        All project data and settings will be permanently removed.
      </Dialog>
    </>
  );
};

export const Default: Story = {
  args: {
    open: false,
    onOpenChange: () => undefined,
    title: "Dialog",
  },
  render: () => <DialogDemo />,
};
