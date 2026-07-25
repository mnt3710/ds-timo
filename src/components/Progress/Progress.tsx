import React from "react";
import styles from "./Progress.module.css";

export interface ProgressProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  value?: number;
  max?: number;
  label?: React.ReactNode;
  showValue?: boolean;
}

export const Progress: React.FC<ProgressProps> = ({
  value,
  max = 100,
  label,
  showValue = false,
  className = "",
  ...props
}) => {
  const percentage =
    value === undefined ? undefined : Math.min(100, Math.max(0, value / max * 100));
  const classNames = [styles.root, className].filter(Boolean).join(" ");

  return (
    <div className={classNames} {...props}>
      {(label || showValue) && (
        <div className={styles.header}>
          <span>{label}</span>
          {showValue && value !== undefined && (
            <span>{Math.round(percentage ?? 0)}%</span>
          )}
        </div>
      )}
      <div
        className={styles.track}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuenow={value}
      >
        <span
          className={[
            styles.bar,
            value === undefined ? styles.indeterminate : "",
          ]
            .filter(Boolean)
            .join(" ")}
          style={
            value === undefined
              ? undefined
              : { width: `${percentage}%` }
          }
        />
      </div>
    </div>
  );
};

Progress.displayName = "Progress";
