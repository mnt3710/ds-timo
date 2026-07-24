import React from "react";
import styles from "./Logo.module.css";
import {
  BlackTimoLogo,
  FillmaExtensionIcon,
  FillmaLogo,
  FillmaToolbarIcon,
  PanoraIcon,
  WhiteTimoLogo,
} from "./assets";

export type LogoType =
  | "timo"
  | "fillma"
  | "fillma-extension"
  | "fillma-toolbar"
  | "panora";

export interface LogoProps {
  /**
   * The TiMo product or asset to display
   */
  type?: LogoType;
  /**
   * The TiMo logo color. Other logo types use their official asset colors.
   */
  variant?: "black" | "white";
  /**
   * The size of the logo
   */
  size?: "sm" | "md" | "lg" | "xl";
  /**
   * Additional CSS class
   */
  className?: string;
  /**
   * Accessible name. Use an empty string when the logo is decorative.
   */
  alt?: string;
}

const logoAssets: Record<Exclude<LogoType, "timo">, string> = {
  fillma: FillmaLogo,
  "fillma-extension": FillmaExtensionIcon,
  "fillma-toolbar": FillmaToolbarIcon,
  panora: PanoraIcon,
};

const defaultAlt: Record<LogoType, string> = {
  timo: "TiMo",
  fillma: "fillma",
  "fillma-extension": "fillma extension",
  "fillma-toolbar": "fillma toolbar",
  panora: "Panora",
};

/**
 * Logo component - TiMo Design System
 *
 * Official logo assets for the TiMo product family.
 */
export const Logo: React.FC<LogoProps> = ({
  type = "timo",
  variant = "black",
  size = "md",
  className = "",
  alt,
}) => {
  const classNames = [styles.logo, styles[size], className]
    .filter(Boolean)
    .join(" ");
  const src =
    type === "timo"
      ? variant === "white"
        ? WhiteTimoLogo
        : BlackTimoLogo
      : logoAssets[type];

  return (
    <div className={classNames}>
      <img className={styles.image} src={src} alt={alt ?? defaultAlt[type]} />
    </div>
  );
};

Logo.displayName = "Logo";
