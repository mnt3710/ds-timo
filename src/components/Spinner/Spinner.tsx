import React from "react";
import styles from "./Spinner.module.css";

export interface SpinnerProps extends React.HTMLAttributes<HTMLSpanElement> {
  size?: "sm" | "md" | "lg";
  label?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({
  size = "md",
  label = "Loading",
  className = "",
  ...props
}) => {
  const classNames = [styles.spinner, styles[size], className]
    .filter(Boolean)
    .join(" ");

  return (
    <span
      className={classNames}
      role="status"
      aria-label={label}
      {...props}
    />
  );
};

Spinner.displayName = "Spinner";
