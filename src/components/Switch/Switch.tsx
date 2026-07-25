import React from "react";
import styles from "./Switch.module.css";

export interface SwitchProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  label?: React.ReactNode;
  description?: React.ReactNode;
}

export const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  (
    {
      checked,
      defaultChecked = false,
      onCheckedChange,
      label,
      description,
      disabled,
      className = "",
      onClick,
      ...props
    },
    ref
  ) => {
    const [internalChecked, setInternalChecked] =
      React.useState(defaultChecked);
    const isControlled = checked !== undefined;
    const isChecked = checked ?? internalChecked;
    const classNames = [styles.root, className].filter(Boolean).join(" ");

    const toggle = () => {
      const nextChecked = !isChecked;
      if (!isControlled) {
        setInternalChecked(nextChecked);
      }
      onCheckedChange?.(nextChecked);
    };

    return (
      <div className={classNames}>
        <button
          ref={ref}
          type="button"
          role="switch"
          className={styles.control}
          aria-checked={isChecked}
          disabled={disabled}
          onClick={(event) => {
            onClick?.(event);
            if (!event.defaultPrevented) {
              toggle();
            }
          }}
          {...props}
        >
          <span className={styles.thumb} />
        </button>
        {(label || description) && (
          <span className={styles.content}>
            {label && <span className={styles.label}>{label}</span>}
            {description && (
              <span className={styles.description}>{description}</span>
            )}
          </span>
        )}
      </div>
    );
  }
);

Switch.displayName = "Switch";
