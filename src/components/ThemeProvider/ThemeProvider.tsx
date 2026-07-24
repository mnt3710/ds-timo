import React from "react";
import styles from "./ThemeProvider.module.css";

export type Theme = "light" | "dark";

export interface AccentColor {
  primary: string;
  active?: string;
  subtle?: string;
  foreground?: string;
}

export interface ThemeProviderProps
  extends React.HTMLAttributes<HTMLDivElement> {
  theme: Theme;
  accent?: AccentColor;
  children: React.ReactNode;
}

type ThemeStyle = React.CSSProperties & Record<`--${string}`, string>;

export const ThemeProvider = React.forwardRef<
  HTMLDivElement,
  ThemeProviderProps
>(({ theme, accent, className = "", style, children, ...props }, ref) => {
  const classNames = [styles.provider, className].filter(Boolean).join(" ");
  const themeStyle: ThemeStyle = {
    ...style,
    ...(accent
      ? {
          "--color-accent-primary": accent.primary,
          ...(accent.active
            ? { "--color-accent-primary-active": accent.active }
            : {}),
          ...(accent.subtle
            ? { "--color-accent-subtle": accent.subtle }
            : {}),
          ...(accent.foreground
            ? { "--color-on-accent": accent.foreground }
            : {}),
        }
      : {}),
  };

  return (
    <div
      ref={ref}
      data-theme={theme}
      className={classNames}
      style={themeStyle}
      {...props}
    >
      {children}
    </div>
  );
});

ThemeProvider.displayName = "ThemeProvider";
