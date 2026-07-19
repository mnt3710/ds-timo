import React from 'react';
import styles from './Badge.module.css';

export interface BadgeProps {
  /**
   * The visual style variant of the badge
   */
  variant?: 'accent' | 'neutral' | 'indigo';
  /**
   * The size of the badge
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Content of the badge
   */
  children: React.ReactNode;
  /**
   * Additional CSS class
   */
  className?: string;
}

/**
 * Badge component - TiMo Design System
 * 
 * Uses gold-light for subtle accent highlighting.
 * Badge represents status, labels, or counts.
 */
export const Badge: React.FC<BadgeProps> = ({ 
  variant = 'accent', 
  size = 'md',
  className = '',
  children 
}) => {
  const classNames = [
    styles.badge,
    styles[variant],
    styles[size],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={classNames}>
      {children}
    </span>
  );
};

Badge.displayName = 'Badge';
