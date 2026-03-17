import type { Meta, StoryObj } from "@storybook/react-vite";
import { Card } from "./Card";

const meta = {
  title: "Components/Card",
  component: Card,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-[320px] bg-gray-100 p-6">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    variant: {
      control: "select",
      options: [
        "role-select",
        "default",
        "primary-variant-bordered",
        "default-blue-shadow",
        "default-black-shadow",
        "plain-inverse",
        "gray-200-elevated",
        "gray-300-bordered",
        "inverse-elevated",
        "section-divider",
      ],
    },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const RoleSelect: Story = {
  args: {
    variant: "role-select",
    children: <div className="text-center">Role Select</div>,
  },
};

export const Default: Story = {
  args: {
    variant: "default",
    children: <div>Default Card</div>,
  },
};

export const PrimaryVariantBordered: Story = {
  args: {
    variant: "primary-variant-bordered",
    children: <div>Primary Variant Bordered</div>,
  },
};

export const DefaultBlueShadow: Story = {
  args: {
    variant: "default-blue-shadow",
    children: <div>Default Blue Shadow</div>,
  },
};

export const DefaultBlackShadow: Story = {
  args: {
    variant: "default-black-shadow",
    children: <div>Default Black Shadow</div>,
  },
};

export const PlainInverse: Story = {
  args: {
    variant: "plain-inverse",
    children: <div>Plain Inverse</div>,
  },
};

export const Gray200Elevated: Story = {
  args: {
    variant: "gray-200-elevated",
    children: <div>Gray 200 Elevated</div>,
  },
};

export const Gray300Bordered: Story = {
  args: {
    variant: "gray-300-bordered",
    children: <div>Gray 300 Bordered</div>,
  },
};

export const InverseElevated: Story = {
  args: {
    variant: "inverse-elevated",
    children: <div>Inverse Elevated</div>,
  },
};

export const SectionDivider: Story = {
  args: {
    variant: "section-divider",
    children: <div>Section Divider</div>,
  },
};