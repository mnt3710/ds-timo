import React from "react";
import { useFormField } from "../FormField/FormFieldContext";
import styles from "./Checkbox.module.css";

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
  label?: React.ReactNode;
  description?: React.ReactNode;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      label,
      description,
      className = "",
      id,
      required,
      "aria-describedby": ariaDescribedBy,
      ...props
    },
    ref
  ) => {
    const field = useFormField();
    const generatedId = React.useId().replace(/:/g, "");
    const controlId =
      id ?? field?.controlId ?? `timo-checkbox-${generatedId}`;
    const descriptionId = description ? `${controlId}-description` : undefined;
    const classNames = [styles.root, className].filter(Boolean).join(" ");

    return (
      <label className={classNames} htmlFor={controlId}>
        <input
          ref={ref}
          id={controlId}
          type="checkbox"
          className={styles.input}
          required={required ?? field?.required}
          aria-describedby={
            ariaDescribedBy ?? field?.describedBy ?? descriptionId
          }
          {...props}
        />
        <span className={styles.control} aria-hidden="true">
          <span className={styles.check}>✓</span>
        </span>
        {(label || description) && (
          <span className={styles.content}>
            {label && <span className={styles.label}>{label}</span>}
            {description && (
              <span id={descriptionId} className={styles.description}>
                {description}
              </span>
            )}
          </span>
        )}
      </label>
    );
  }
);

Checkbox.displayName = "Checkbox";
