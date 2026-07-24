import React from "react";
import styles from "./FormField.module.css";

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
  optionalText?: string;
}

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  (
    {
      required = false,
      optionalText,
      className = "",
      children,
      ...props
    },
    ref
  ) => {
    const classNames = [styles.label, className].filter(Boolean).join(" ");

    return (
      <label ref={ref} className={classNames} {...props}>
        <span>{children}</span>
        {required && (
          <span className={styles.required} aria-hidden="true">
            *
          </span>
        )}
        {!required && optionalText && (
          <span className={styles.optional}>{optionalText}</span>
        )}
      </label>
    );
  }
);

Label.displayName = "Label";
