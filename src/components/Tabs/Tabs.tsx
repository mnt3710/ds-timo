import React from "react";
import styles from "./Tabs.module.css";

export interface TabItem {
  value: string;
  label: React.ReactNode;
  content: React.ReactNode;
  disabled?: boolean;
}

export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  items: TabItem[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}

export const Tabs: React.FC<TabsProps> = ({
  items,
  value,
  defaultValue,
  onValueChange,
  className = "",
  ...props
}) => {
  const firstEnabled = items.find((item) => !item.disabled)?.value ?? "";
  const [internalValue, setInternalValue] = React.useState(
    defaultValue ?? firstEnabled
  );
  const generatedId = React.useId().replace(/:/g, "");
  const isControlled = value !== undefined;
  const activeValue = value ?? internalValue;
  const classNames = [styles.root, className].filter(Boolean).join(" ");
  const tabRefs = React.useRef<Array<HTMLButtonElement | null>>([]);

  const selectTab = (nextValue: string) => {
    if (!isControlled) {
      setInternalValue(nextValue);
    }
    onValueChange?.(nextValue);
  };

  const handleKeyDown = (
    event: React.KeyboardEvent,
    currentIndex: number
  ) => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) {
      return;
    }

    event.preventDefault();
    const direction = event.key === "ArrowLeft" ? -1 : 1;
    let index =
      event.key === "Home"
        ? 0
        : event.key === "End"
          ? items.length - 1
          : currentIndex + direction;

    for (let count = 0; count < items.length; count += 1) {
      const nextIndex = (index + items.length) % items.length;
      if (!items[nextIndex].disabled) {
        selectTab(items[nextIndex].value);
        tabRefs.current[nextIndex]?.focus();
        return;
      }
      index += direction;
    }
  };

  const activeItem = items.find((item) => item.value === activeValue);

  return (
    <div className={classNames} {...props}>
      <div className={styles.list} role="tablist">
        {items.map((item, index) => {
          const selected = item.value === activeValue;
          const tabId = `timo-tabs-${generatedId}-tab-${index}`;
          const panelId = `timo-tabs-${generatedId}-panel-${index}`;

          return (
            <button
              key={item.value}
              ref={(node) => {
                tabRefs.current[index] = node;
              }}
              id={tabId}
              type="button"
              className={styles.tab}
              role="tab"
              aria-selected={selected}
              aria-controls={panelId}
              tabIndex={selected ? 0 : -1}
              disabled={item.disabled}
              onClick={() => selectTab(item.value)}
              onKeyDown={(event) => handleKeyDown(event, index)}
            >
              {item.label}
            </button>
          );
        })}
      </div>
      {activeItem && (
        <div
          id={`timo-tabs-${generatedId}-panel-${items.indexOf(activeItem)}`}
          className={styles.panel}
          role="tabpanel"
          aria-labelledby={`timo-tabs-${generatedId}-tab-${items.indexOf(activeItem)}`}
          tabIndex={0}
        >
          {activeItem.content}
        </div>
      )}
    </div>
  );
};

Tabs.displayName = "Tabs";
