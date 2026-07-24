import React from "react";

export interface FormFieldContextValue {
  controlId: string;
  describedBy?: string;
  invalid: boolean;
  required: boolean;
}

export const FormFieldContext =
  React.createContext<FormFieldContextValue | null>(null);

export const useFormField = () => React.useContext(FormFieldContext);
