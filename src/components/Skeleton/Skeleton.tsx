import React from "react";
import styles from "./Skeleton.module.css";

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: React.CSSProperties["width"];
  height?: React.CSSProperties["height"];
  radius?: "sm" | "md" | "pill";
}

export const Skeleton: React.FC<SkeletonProps> = ({
  width = "100%",
  height = 16,
  radius = "sm",
  className = "",
  style,
  ...props
}) => {
  const classNames = [styles.skeleton, styles[radius], className]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={classNames}
      aria-hidden="true"
      style={{ width, height, ...style }}
      {...props}
    />
  );
};

Skeleton.displayName = "Skeleton";
