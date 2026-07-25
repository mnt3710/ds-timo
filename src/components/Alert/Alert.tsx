import React from "react";
import styles from "./Alert.module.css";

export type AlertVariant = "info" | "success" | "warning" | "error";

export interface AlertProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  variant?: AlertVariant;
  title?: React.ReactNode;
  action?: React.ReactNode;
}

const icons: Record<AlertVariant, string> = {
  info: "i",
  success: "✓",
  warning: "!",
  error: "×",
};

export const Alert: React.FC<AlertProps> = ({
  variant = "info",
  title,
  action,
  className = "",
  children,
  ...props
}) => {
  const classNames = [styles.alert, styles[variant], className]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={classNames}
      role={variant === "error" ? "alert" : "status"}
      {...props}
    >
      <span className={styles.icon} aria-hidden="true">
        {icons[variant]}
      </span>
      <div className={styles.content}>
        {title && <strong className={styles.title}>{title}</strong>}
        {children && <div className={styles.description}>{children}</div>}
      </div>
      {action && <div className={styles.action}>{action}</div>}
    </div>
  );
};

Alert.displayName = "Alert";
