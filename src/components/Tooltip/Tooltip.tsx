import React from "react";
import styles from "./Tooltip.module.css";

export interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactElement;
  placement?: "top" | "bottom";
  delay?: number;
}

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  placement = "top",
  delay = 300,
}) => {
  const [visible, setVisible] = React.useState(false);
  const timeoutRef = React.useRef<number | undefined>(undefined);
  const generatedId = React.useId().replace(/:/g, "");
  const tooltipId = `timo-tooltip-${generatedId}`;

  const show = () => {
    window.clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => setVisible(true), delay);
  };

  const hide = () => {
    window.clearTimeout(timeoutRef.current);
    setVisible(false);
  };

  React.useEffect(
    () => () => window.clearTimeout(timeoutRef.current),
    []
  );

  return (
    <span
      className={styles.root}
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          hide();
        }
      }}
    >
      {React.cloneElement(children, {
        "aria-describedby": visible ? tooltipId : undefined,
      } as React.HTMLAttributes<HTMLElement>)}
      {visible && (
        <span
          id={tooltipId}
          className={[styles.tooltip, styles[placement]].join(" ")}
          role="tooltip"
        >
          {content}
        </span>
      )}
    </span>
  );
};

Tooltip.displayName = "Tooltip";
