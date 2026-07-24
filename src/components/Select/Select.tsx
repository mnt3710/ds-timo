import React from "react";
import { useFormField } from "../FormField/FormFieldContext";
import styles from "./Select.module.css";

export interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "size"> {
  size?: "sm" | "md" | "lg";
  invalid?: boolean;
  fullWidth?: boolean;
  placeholder?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      size = "md",
      invalid,
      fullWidth = true,
      placeholder,
      className = "",
      id,
      required,
      children,
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
      <select
        ref={ref}
        id={id ?? field?.controlId}
        className={classNames}
        required={required ?? field?.required}
        aria-describedby={ariaDescribedBy ?? field?.describedBy}
        aria-invalid={ariaInvalid ?? (isInvalid || undefined)}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {children}
      </select>
    );
  }
);

Select.displayName = "Select";
