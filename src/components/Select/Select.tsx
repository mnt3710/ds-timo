import React from "react";
import { useFormField } from "../FormField/FormFieldContext";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../Popover";
import styles from "./Select.module.css";

export interface SelectOption {
  value: string;
  label: React.ReactNode;
  disabled?: boolean;
}

export interface SelectProps {
  options: SelectOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string, option: SelectOption) => void;
  name?: string;
  placeholder?: string;
  size?: "sm" | "md" | "lg";
  invalid?: boolean;
  fullWidth?: boolean;
  disabled?: boolean;
  required?: boolean;
  id?: string;
  className?: string;
  "aria-describedby"?: string;
  "aria-invalid"?: React.AriaAttributes["aria-invalid"];
}

export const Select = React.forwardRef<HTMLButtonElement, SelectProps>(
  (
    {
      options,
      value,
      defaultValue = "",
      onValueChange,
      name,
      placeholder = "Select an option",
      size = "md",
      invalid,
      fullWidth = true,
      disabled = false,
      required,
      id,
      className = "",
      "aria-describedby": ariaDescribedBy,
      "aria-invalid": ariaInvalid,
    },
    ref
  ) => {
    const field = useFormField();
    const [internalValue, setInternalValue] = React.useState(defaultValue);
    const [open, setOpen] = React.useState(false);
    const [activeIndex, setActiveIndex] = React.useState(-1);
    const generatedId = React.useId().replace(/:/g, "");
    const isControlled = value !== undefined;
    const selectedValue = value ?? internalValue;
    const selectedIndex = options.findIndex(
      (option) => option.value === selectedValue
    );
    const selectedOption = options[selectedIndex];
    const isInvalid = invalid ?? field?.invalid ?? false;
    const isRequired = required ?? field?.required ?? false;
    const controlId = id ?? field?.controlId ?? `timo-select-${generatedId}`;
    const listboxId = `${controlId}-listbox`;
    const classNames = [
      styles.control,
      styles[size],
      isInvalid ? styles.invalid : "",
      fullWidth ? styles.fullWidth : "",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    const findEnabledIndex = (
      startIndex: number,
      direction: 1 | -1
    ): number => {
      if (options.length === 0) {
        return -1;
      }

      for (let offset = 0; offset < options.length; offset += 1) {
        const index =
          (startIndex + offset * direction + options.length) % options.length;
        if (!options[index].disabled) {
          return index;
        }
      }

      return -1;
    };

    const openWithIndex = (index: number) => {
      setActiveIndex(index);
      setOpen(true);
    };

    const selectOption = (option: SelectOption) => {
      if (option.disabled) {
        return;
      }

      if (!isControlled) {
        setInternalValue(option.value);
      }
      onValueChange?.(option.value, option);
      setOpen(false);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
      if (disabled) {
        return;
      }

      if (event.key === "ArrowDown" || event.key === "ArrowUp") {
        event.preventDefault();
        const direction = event.key === "ArrowDown" ? 1 : -1;
        const startIndex =
          activeIndex >= 0
            ? activeIndex + direction
            : selectedIndex >= 0
              ? selectedIndex
              : direction === 1
                ? 0
                : options.length - 1;
        const nextIndex = findEnabledIndex(startIndex, direction);

        if (open) {
          setActiveIndex(nextIndex);
        } else {
          openWithIndex(nextIndex);
        }
        return;
      }

      if (event.key === "Home" || event.key === "End") {
        event.preventDefault();
        const direction = event.key === "Home" ? 1 : -1;
        const startIndex = event.key === "Home" ? 0 : options.length - 1;
        openWithIndex(findEnabledIndex(startIndex, direction));
        return;
      }

      if ((event.key === "Enter" || event.key === " ") && open) {
        event.preventDefault();
        if (activeIndex >= 0) {
          selectOption(options[activeIndex]);
        }
      }
    };

    const handleOpenChange = (nextOpen: boolean) => {
      setOpen(nextOpen);
      if (nextOpen) {
        setActiveIndex(
          selectedIndex >= 0 ? selectedIndex : findEnabledIndex(0, 1)
        );
      }
    };

    return (
      <Popover
        open={open}
        onOpenChange={handleOpenChange}
        className={fullWidth ? styles.popoverFullWidth : ""}
      >
        <PopoverTrigger>
          <button
            ref={ref}
            id={controlId}
            type="button"
            className={classNames}
            disabled={disabled}
            role="combobox"
            aria-haspopup="listbox"
            aria-controls={open ? listboxId : undefined}
            aria-activedescendant={
              open && activeIndex >= 0
                ? `${listboxId}-option-${activeIndex}`
                : undefined
            }
            aria-required={isRequired || undefined}
            aria-describedby={ariaDescribedBy ?? field?.describedBy}
            aria-invalid={ariaInvalid ?? (isInvalid || undefined)}
            onKeyDown={handleKeyDown}
          >
            <span
              className={selectedOption ? styles.value : styles.placeholder}
            >
              {selectedOption?.label ?? placeholder}
            </span>
            <span className={styles.chevron} aria-hidden="true" />
          </button>
        </PopoverTrigger>

        <PopoverContent
          id={listboxId}
          className={styles.options}
          role="listbox"
          aria-labelledby={controlId}
        >
          {options.map((option, index) => {
            const selected = option.value === selectedValue;
            const active = index === activeIndex;

            return (
              <div
                key={option.value}
                id={`${listboxId}-option-${index}`}
                className={[
                  styles.option,
                  selected ? styles.selected : "",
                  active ? styles.active : "",
                  option.disabled ? styles.optionDisabled : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                role="option"
                aria-selected={selected}
                aria-disabled={option.disabled || undefined}
                onMouseEnter={() => {
                  if (!option.disabled) {
                    setActiveIndex(index);
                  }
                }}
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => selectOption(option)}
              >
                <span>{option.label}</span>
                {selected && (
                  <span className={styles.check} aria-hidden="true">
                    ✓
                  </span>
                )}
              </div>
            );
          })}
        </PopoverContent>

        {name && <input type="hidden" name={name} value={selectedValue} />}
      </Popover>
    );
  }
);

Select.displayName = "Select";
