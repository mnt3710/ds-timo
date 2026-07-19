import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';

const meta = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'indigo', 'elevated'],
    },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'default',
    children: (
      <div>
        <h3 style={{ marginBottom: '8px', fontSize: '1.25rem' }}>Card Title</h3>
        <p style={{ color: 'var(--color-text-secondary)' }}>
          This is a default card using surface color.
        </p>
      </div>
    ),
  },
};

export const Indigo: Story = {
  args: {
    variant: 'indigo',
    children: (
      <div>
        <h3 style={{ marginBottom: '8px', fontSize: '1.25rem' }}>Indigo Card</h3>
        <p style={{ opacity: 0.9 }}>
          This card uses the indigo brand surface (fabric).
        </p>
      </div>
    ),
  },
};

export const Elevated: Story = {
  args: {
    variant: 'elevated',
    children: (
      <div>
        <h3 style={{ marginBottom: '8px', fontSize: '1.25rem' }}>Elevated Card</h3>
        <p style={{ color: 'var(--color-text-secondary)' }}>
          This card has a shadow for depth and elevation.
        </p>
      </div>
    ),
  },
};

export const Interactive: Story = {
  args: {
    variant: 'default',
    onClick: () => alert('Card clicked!'),
    children: (
      <div>
        <h3 style={{ marginBottom: '8px', fontSize: '1.25rem' }}>Interactive Card</h3>
        <p style={{ color: 'var(--color-text-secondary)' }}>
          Click me! This card is interactive.
        </p>
      </div>
    ),
  },
};

export const ProductCard: Story = {
  args: {
    variant: 'elevated',
    children: (
      <div>
        <div style={{ 
          width: '100%', 
          height: '200px', 
          background: 'var(--color-surface)',
          borderRadius: '8px',
          marginBottom: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--color-text-secondary)',
        }}>
          Image Placeholder
        </div>
        <h3 style={{ marginBottom: '8px', fontSize: '1.25rem' }}>Product Name</h3>
        <p style={{ color: 'var(--color-text-secondary)', marginBottom: '12px' }}>
          A beautiful vintage item from the dig-vault collection.
        </p>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center' 
        }}>
          <span style={{ 
            fontSize: '1.5rem', 
            fontWeight: 600,
            color: 'var(--color-text-primary)',
          }}>
            $89.00
          </span>
          <span style={{ 
            padding: '4px 12px', 
            background: 'var(--color-accent-subtle)',
            color: 'var(--indigo-raw)',
            borderRadius: '16px',
            fontSize: '0.75rem',
            fontWeight: 500,
          }}>
            In Stock
          </span>
        </div>
      </div>
    ),
  },
};
