import React from "react";
import { useFormField } from "../FormField/FormFieldContext";
import styles from "./Radio.module.css";

export interface RadioProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
  label?: React.ReactNode;
  description?: React.ReactNode;
}

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
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
    const controlId = id ?? field?.controlId ?? `timo-radio-${generatedId}`;
    const descriptionId = description ? `${controlId}-description` : undefined;
    const classNames = [styles.root, className].filter(Boolean).join(" ");

    return (
      <label className={classNames} htmlFor={controlId}>
        <input
          ref={ref}
          id={controlId}
          type="radio"
          className={styles.input}
          required={required ?? field?.required}
          aria-describedby={
            ariaDescribedBy ?? field?.describedBy ?? descriptionId
          }
          {...props}
        />
        <span className={styles.control} aria-hidden="true">
          <span className={styles.dot} />
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

Radio.displayName = "Radio";
