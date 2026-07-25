import React from "react";
import styles from "./Popover.module.css";
import {
  PopoverContext,
  type PopoverPlacement,
} from "./PopoverContext";

export interface PopoverProps {
  children: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  placement?: PopoverPlacement;
  className?: string;
}

export const Popover: React.FC<PopoverProps> = ({
  children,
  open,
  defaultOpen = false,
  onOpenChange,
  placement = "bottom-start",
  className = "",
}) => {
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
  const rootRef = React.useRef<HTMLDivElement>(null);
  const triggerRef = React.useRef<HTMLElement>(null);
  const generatedId = React.useId().replace(/:/g, "");
  const isControlled = open !== undefined;
  const isOpen = open ?? internalOpen;

  const setOpen = (nextOpen: boolean) => {
    if (!isControlled) {
      setInternalOpen(nextOpen);
    }
    onOpenChange?.(nextOpen);
  };

  React.useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handlePointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        triggerRef.current?.focus();
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, isControlled, onOpenChange]);

  const classNames = [styles.root, className].filter(Boolean).join(" ");

  return (
    <PopoverContext.Provider
      value={{
        contentId: `timo-popover-${generatedId}`,
        open: isOpen,
        placement,
        setOpen,
        triggerRef,
      }}
    >
      <div ref={rootRef} className={classNames}>
        {children}
      </div>
    </PopoverContext.Provider>
  );
};

Popover.displayName = "Popover";
