import React from "react";
import styles from "./Popover.module.css";
import { usePopover } from "./PopoverContext";

export interface PopoverContentProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export const PopoverContent = React.forwardRef<
  HTMLDivElement,
  PopoverContentProps
>(({ className = "", children, ...props }, ref) => {
  const { contentId, open, placement } = usePopover();

  if (!open) {
    return null;
  }

  const classNames = [
    styles.content,
    styles[placement],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div ref={ref} id={contentId} className={classNames} {...props}>
      {children}
    </div>
  );
});

PopoverContent.displayName = "PopoverContent";
