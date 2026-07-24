import React from "react";
import { useFormField } from "../FormField/FormFieldContext";
import styles from "./Textarea.module.css";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  size?: "sm" | "md" | "lg";
  invalid?: boolean;
  fullWidth?: boolean;
  resize?: "none" | "vertical" | "horizontal" | "both";
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      size = "md",
      invalid,
      fullWidth = true,
      resize = "vertical",
      rows = 4,
      className = "",
      id,
      required,
      "aria-describedby": ariaDescribedBy,
      "aria-invalid": ariaInvalid,
      ...props
    },
    ref
  ) => {
    const field = useFormField();
    const isInvalid = invalid ?? field?.invalid ?? false;
    const classNames = [
      styles.control,
      styles[size],
      styles[`resize-${resize}`],
      isInvalid ? styles.invalid : "",
      fullWidth ? styles.fullWidth : "",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <textarea
        ref={ref}
        id={id ?? field?.controlId}
        className={classNames}
        required={required ?? field?.required}
        rows={rows}
        aria-describedby={ariaDescribedBy ?? field?.describedBy}
        aria-invalid={ariaInvalid ?? (isInvalid || undefined)}
        {...props}
      />
    );
  }
);

Textarea.displayName = "Textarea";
