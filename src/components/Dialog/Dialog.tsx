import React from "react";
import { IconButton } from "../IconButton";
import styles from "./Dialog.module.css";

export interface DialogProps
  extends Omit<React.DialogHTMLAttributes<HTMLDialogElement>, "open" | "title"> {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: React.ReactNode;
  description?: React.ReactNode;
  footer?: React.ReactNode;
  closeLabel?: string;
}

export const Dialog = React.forwardRef<HTMLDialogElement, DialogProps>(
  (
    {
      open,
      onOpenChange,
      title,
      description,
      footer,
      closeLabel = "Close dialog",
      className = "",
      children,
      onCancel,
      onClick,
      ...props
    },
    forwardedRef
  ) => {
    const internalRef = React.useRef<HTMLDialogElement>(null);
    const generatedId = React.useId().replace(/:/g, "");
    const titleId = `timo-dialog-${generatedId}-title`;
    const descriptionId = description
      ? `timo-dialog-${generatedId}-description`
      : undefined;

    React.useImperativeHandle(forwardedRef, () => internalRef.current!);

    React.useEffect(() => {
      const dialog = internalRef.current;
      if (!dialog) {
        return;
      }

      if (open && !dialog.open) {
        dialog.showModal();
      } else if (!open && dialog.open) {
        dialog.close();
      }
    }, [open]);

    const classNames = [styles.dialog, className].filter(Boolean).join(" ");

    return (
      <dialog
        ref={internalRef}
        className={classNames}
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        onCancel={(event) => {
          onCancel?.(event);
          if (!event.defaultPrevented) {
            event.preventDefault();
            onOpenChange(false);
          }
        }}
        onClick={(event) => {
          onClick?.(event);
          if (
            !event.defaultPrevented &&
            event.target === event.currentTarget
          ) {
            onOpenChange(false);
          }
        }}
        {...props}
      >
        <div className={styles.panel}>
          <header className={styles.header}>
            <div className={styles.heading}>
              <h2 id={titleId} className={styles.title}>
                {title}
              </h2>
              {description && (
                <p id={descriptionId} className={styles.description}>
                  {description}
                </p>
              )}
            </div>
            <IconButton
              aria-label={closeLabel}
              size="sm"
              variant="ghost"
              onClick={() => onOpenChange(false)}
            >
              ×
            </IconButton>
          </header>
          <div className={styles.body}>{children}</div>
          {footer && <footer className={styles.footer}>{footer}</footer>}
        </div>
      </dialog>
    );
  }
);

Dialog.displayName = "Dialog";
