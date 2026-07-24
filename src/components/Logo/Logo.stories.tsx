import type { Meta, StoryObj } from "@storybook/react";
import { Logo, type LogoType } from "./Logo";

const meta = {
  title: "Components/Logo",
  component: Logo,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: [
        "timo",
        "fillma",
        "fillma-extension",
        "fillma-toolbar",
        "panora",
      ],
    },
    variant: {
      control: "select",
      options: ["black", "white"],
      description: "Only applies to the TiMo logo",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg", "xl"],
    },
  },
} satisfies Meta<typeof Logo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TimoBlack: Story = {
  args: {
    type: "timo",
    variant: "black",
    size: "md",
  },
};

export const TimoWhite: Story = {
  args: {
    type: "timo",
    variant: "white",
    size: "md",
  },
  parameters: {
    backgrounds: { default: "dark" },
  },
};

export const Fillma: Story = {
  args: {
    type: "fillma",
    size: "xl",
  },
};

export const FillmaExtension: Story = {
  args: {
    type: "fillma-extension",
    size: "xl",
  },
};

export const FillmaToolbar: Story = {
  args: {
    type: "fillma-toolbar",
    size: "xl",
  },
};

export const Panora: Story = {
  args: {
    type: "panora",
    size: "xl",
  },
};

const logoTypes: LogoType[] = [
  "timo",
  "fillma",
  "fillma-extension",
  "fillma-toolbar",
  "panora",
];

export const AllLogos: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 32,
        padding: 32,
      }}
    >
      {logoTypes.map((type) => (
        <div
          key={type}
          style={{
            display: "grid",
            justifyItems: "center",
            gap: 8,
            minWidth: 96,
          }}
        >
          <Logo type={type} size="xl" />
          <span style={{ fontFamily: "sans-serif", fontSize: 12 }}>{type}</span>
        </div>
      ))}
    </div>
  ),
};
