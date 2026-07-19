import React from 'react';
import styles from './Logo.module.css';

export interface LogoProps {
  /**
   * The color variant (only black or white allowed per brand guidelines)
   */
  variant?: 'black' | 'white';
  /**
   * The size of the logo
   */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /**
   * Additional CSS class
   */
  className?: string;
}

/**
 * Logo component - TiMo Design System
 * 
 * Crown icon + cursive "TiMo" signature.
 * MUST always be monochrome (black or white only).
 * Never use brand colors (indigo/gold) on the logo.
 */
export const Logo: React.FC<LogoProps> = ({ 
  variant = 'black', 
  size = 'md',
  className = '' 
}) => {
  const classNames = [
    styles.logo,
    styles[variant],
    styles[size],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classNames}>
      <svg 
        className={styles.crown}
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path 
          d="M12 2L15 8L21 9L16 14L18 21L12 17L6 21L8 14L3 9L9 8L12 2Z" 
          fill="currentColor"
        />
      </svg>
      <span className={styles.text}>TiMo</span>
    </div>
  );
};

Logo.displayName = 'Logo';
