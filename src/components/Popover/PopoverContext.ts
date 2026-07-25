import React from "react";

export type PopoverPlacement = "bottom-start" | "bottom-end";

export interface PopoverContextValue {
  contentId: string;
  open: boolean;
  placement: PopoverPlacement;
  setOpen: (open: boolean) => void;
  triggerRef: React.MutableRefObject<HTMLElement | null>;
}

export const PopoverContext =
  React.createContext<PopoverContextValue | null>(null);

export const usePopover = () => {
  const context = React.useContext(PopoverContext);

  if (!context) {
    throw new Error("Popover components must be used inside Popover.");
  }

  return context;
};
