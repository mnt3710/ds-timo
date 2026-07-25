import React from "react";
import { usePopover } from "./PopoverContext";

export interface PopoverTriggerProps {
  children: React.ReactElement;
}

export const PopoverTrigger: React.FC<PopoverTriggerProps> = ({ children }) => {
  const { contentId, open, setOpen, triggerRef } = usePopover();
  const child = children as React.ReactElement<{
    "aria-controls"?: string;
    "aria-expanded"?: boolean;
    onClick?: React.MouseEventHandler;
    ref?: React.Ref<HTMLElement>;
  }>;
  const childRef = (
    child as React.ReactElement & { ref?: React.Ref<HTMLElement> }
  ).ref;

  const setRefs = (node: HTMLElement | null) => {
    triggerRef.current = node;

    if (typeof childRef === "function") {
      childRef(node);
    } else if (childRef) {
      (childRef as React.MutableRefObject<HTMLElement | null>).current = node;
    }
  };

  return React.cloneElement(child, {
    "aria-controls": open
      ? child.props["aria-controls"] ?? contentId
      : undefined,
    "aria-expanded": open,
    ref: setRefs,
    onClick: (event: React.MouseEvent) => {
      child.props.onClick?.(event);
      if (!event.defaultPrevented) {
        setOpen(!open);
      }
    },
  });
};

PopoverTrigger.displayName = "PopoverTrigger";
