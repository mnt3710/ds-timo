import React from "react";
import styles from "./Link.module.css";

export interface LinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: "text" | "button" | "subtle";
  external?: boolean;
}

export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  (
    {
      variant = "text",
      external = false,
      className = "",
      children,
      target,
      rel,
      ...props
    },
    ref
  ) => {
    const classNames = [styles.link, styles[variant], className]
      .filter(Boolean)
      .join(" ");

    return (
      <a
        ref={ref}
        className={classNames}
        target={external ? "_blank" : target}
        rel={external ? "noreferrer noopener" : rel}
        {...props}
      >
        {children}
        {external && (
          <span className={styles.external} aria-hidden="true">
            ↗
          </span>
        )}
      </a>
    );
  }
);

Link.displayName = "Link";
