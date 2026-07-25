import React from "react";
import styles from "./IconButton.module.css";

export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  "aria-label": string;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
}

export const IconButton = React.forwardRef<
  HTMLButtonElement,
  IconButtonProps
>(
  (
    {
      variant = "ghost",
      size = "md",
      className = "",
      type = "button",
      children,
      ...props
    },
    ref
  ) => {
    const classNames = [
      styles.button,
      styles[variant],
      styles[size],
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <button ref={ref} type={type} className={classNames} {...props}>
        {children}
      </button>
    );
  }
);

IconButton.displayName = "IconButton";
