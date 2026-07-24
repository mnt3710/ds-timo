import React from "react";
import { useFormField } from "../FormField/FormFieldContext";
import styles from "./Input.module.css";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  size?: "sm" | "md" | "lg";
  invalid?: boolean;
  fullWidth?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      size = "md",
      invalid,
      fullWidth = true,
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
      isInvalid ? styles.invalid : "",
      fullWidth ? styles.fullWidth : "",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <input
        ref={ref}
        id={id ?? field?.controlId}
        className={classNames}
        required={required ?? field?.required}
        aria-describedby={ariaDescribedBy ?? field?.describedBy}
        aria-invalid={ariaInvalid ?? (isInvalid || undefined)}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";
