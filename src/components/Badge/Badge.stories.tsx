import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './Badge';

const meta = {
  title: 'Components/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['accent', 'neutral', 'indigo'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Accent: Story = {
  args: {
    variant: 'accent',
    children: 'Accent Badge',
  },
};

export const Neutral: Story = {
  args: {
    variant: 'neutral',
    children: 'Neutral Badge',
  },
};

export const Indigo: Story = {
  args: {
    variant: 'indigo',
    children: 'Indigo Badge',
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    children: 'New',
  },
};

export const Medium: Story = {
  args: {
    size: 'md',
    children: 'Featured',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    children: 'Premium',
  },
};

export const WithNumber: Story = {
  args: {
    variant: 'accent',
    children: '5',
  },
};

export const StatusBadges: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <Badge variant="accent">New</Badge>
      <Badge variant="neutral">In Progress</Badge>
      <Badge variant="indigo">Completed</Badge>
      <Badge variant="accent" size="sm">3</Badge>
    </div>
  ),
};
