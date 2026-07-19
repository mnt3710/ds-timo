import React from 'react';
import styles from './Card.module.css';

export interface CardProps {
  /**
   * The visual style variant of the card
   */
  variant?: 'default' | 'indigo' | 'elevated';
  /**
   * Content of the card
   */
  children: React.ReactNode;
  /**
   * Additional CSS class
   */
  className?: string;
  /**
   * Click handler - makes card interactive
   */
  onClick?: () => void;
}

/**
 * Card component - TiMo Design System
 * 
 * Container with rounded corners using indigo-raw or surface colors.
 * Cards provide visual grouping and hierarchy.
 */
export const Card: React.FC<CardProps> = ({ 
  variant = 'default',
  className = '',
  onClick,
  children 
}) => {
  const classNames = [
    styles.card,
    styles[variant],
    onClick ? styles.interactive : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const Component = onClick ? 'button' : 'div';

  return (
    <Component 
      className={classNames}
      onClick={onClick}
      type={onClick ? 'button' : undefined}
    >
      {children}
    </Component>
  );
};

Card.displayName = 'Card';
