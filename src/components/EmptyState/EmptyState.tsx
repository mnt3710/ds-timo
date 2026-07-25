import React from "react";
import styles from "./EmptyState.module.css";

export interface EmptyStateProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  icon?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  action,
  className = "",
  ...props
}) => {
  const classNames = [styles.root, className].filter(Boolean).join(" ");

  return (
    <div className={classNames} {...props}>
      {icon && <div className={styles.icon}>{icon}</div>}
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        {description && (
          <p className={styles.description}>{description}</p>
        )}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
};

EmptyState.displayName = "EmptyState";
