import type { Meta, StoryObj } from '@storybook/react';
import { Logo } from './Logo';

const meta = {
  title: 'Components/Logo',
  component: Logo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['black', 'white'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
    },
  },
} satisfies Meta<typeof Logo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Black: Story = {
  args: {
    variant: 'black',
    size: 'md',
  },
};

export const White: Story = {
  args: {
    variant: 'white',
    size: 'md',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export const Small: Story = {
  args: {
    variant: 'black',
    size: 'sm',
  },
};

export const Medium: Story = {
  args: {
    variant: 'black',
    size: 'md',
  },
};

export const Large: Story = {
  args: {
    variant: 'black',
    size: 'lg',
  },
};

export const ExtraLarge: Story = {
  args: {
    variant: 'black',
    size: 'xl',
  },
};

export const OnIndigoSurface: Story = {
  args: {
    variant: 'white',
    size: 'lg',
  },
  decorators: [
    (Story) => (
      <div style={{ 
        background: 'var(--indigo-raw)', 
        padding: '40px',
        borderRadius: '12px',
      }}>
        <Story />
      </div>
    ),
  ],
};
