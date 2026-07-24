import React from "react";
import styles from "./FormField.module.css";
import { FormFieldContext } from "./FormFieldContext";
import { Label } from "./Label";

export interface FormFieldProps {
  label: React.ReactNode;
  children: React.ReactNode;
  id?: string;
  helperText?: React.ReactNode;
  error?: React.ReactNode;
  required?: boolean;
  optionalText?: string;
  className?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  children,
  id,
  helperText,
  error,
  required = false,
  optionalText = "Optional",
  className = "",
}) => {
  const generatedId = React.useId().replace(/:/g, "");
  const controlId = id ?? `timo-field-${generatedId}`;
  const messageId = `${controlId}-${error ? "error" : "helper"}`;
  const describedBy = error || helperText ? messageId : undefined;
  const classNames = [styles.field, className].filter(Boolean).join(" ");

  return (
    <div className={classNames}>
      <Label
        htmlFor={controlId}
        required={required}
        optionalText={optionalText}
      >
        {label}
      </Label>
      <FormFieldContext.Provider
        value={{
          controlId,
          describedBy,
          invalid: Boolean(error),
          required,
        }}
      >
        {children}
      </FormFieldContext.Provider>
      {error ? (
        <div id={messageId} className={styles.error} role="alert">
          {error}
        </div>
      ) : helperText ? (
        <div id={messageId} className={styles.helper}>
          {helperText}
        </div>
      ) : null}
    </div>
  );
};

FormField.displayName = "FormField";
