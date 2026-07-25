import React from "react";
import { useFormField } from "../FormField/FormFieldContext";
import styles from "./Slider.module.css";

export interface SliderProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
  showValue?: boolean;
  formatValue?: (value: number) => React.ReactNode;
}

export const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  (
    {
      showValue = false,
      formatValue = (value) => value,
      min = 0,
      max = 100,
      value,
      defaultValue,
      onChange,
      className = "",
      id,
      ...props
    },
    ref
  ) => {
    const field = useFormField();
    const [internalValue, setInternalValue] = React.useState(
      Number(defaultValue ?? min)
    );
    const currentValue = Number(value ?? internalValue);
    const percentage =
      ((currentValue - Number(min)) / (Number(max) - Number(min))) * 100;
    const classNames = [styles.root, className].filter(Boolean).join(" ");

    return (
      <div className={classNames}>
        <input
          ref={ref}
          id={id ?? field?.controlId}
          type="range"
          className={styles.input}
          min={min}
          max={max}
          value={value}
          defaultValue={defaultValue}
          aria-describedby={field?.describedBy}
          style={{ "--slider-progress": `${percentage}%` } as React.CSSProperties}
          onChange={(event) => {
            setInternalValue(event.currentTarget.valueAsNumber);
            onChange?.(event);
          }}
          {...props}
        />
        {showValue && (
          <output className={styles.value} htmlFor={id ?? field?.controlId}>
            {formatValue(currentValue)}
          </output>
        )}
      </div>
    );
  }
);

Slider.displayName = "Slider";
