import React from "react";
import { Alert, type AlertVariant } from "../Alert";
import { IconButton } from "../IconButton";
import styles from "./Toast.module.css";

export interface ToastProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: React.ReactNode;
  children?: React.ReactNode;
  variant?: AlertVariant;
  duration?: number;
  action?: React.ReactNode;
  className?: string;
}

export const Toast: React.FC<ToastProps> = ({
  open,
  onOpenChange,
  title,
  children,
  variant = "info",
  duration = 5000,
  action,
  className = "",
}) => {
  React.useEffect(() => {
    if (!open || duration <= 0) {
      return;
    }

    const timeout = window.setTimeout(() => onOpenChange(false), duration);
    return () => window.clearTimeout(timeout);
  }, [open, duration, onOpenChange]);

  if (!open) {
    return null;
  }

  const classNames = [styles.toast, className].filter(Boolean).join(" ");

  return (
    <div className={classNames} aria-live="polite">
      <Alert
        variant={variant}
        title={title}
        action={
          <div className={styles.actions}>
            {action}
            <IconButton
              size="sm"
              variant="ghost"
              aria-label="Dismiss notification"
              onClick={() => onOpenChange(false)}
            >
              ×
            </IconButton>
          </div>
        }
      >
        {children}
      </Alert>
    </div>
  );
};

Toast.displayName = "Toast";
