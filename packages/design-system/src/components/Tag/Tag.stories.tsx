import type { Meta, StoryObj } from "@storybook/react-vite";
import { Tag } from "./Tag";

const meta = {
  title: "Components/Tag",
  component: Tag,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="flex flex-wrap items-center gap-3 p-6">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    variant: {
      control: "select",
      options: ["pill", "pill-wide", "pill-static", "rounded-rect"],
    },
    selected: {
      control: "boolean",
    },
    changeOnClick: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PillDefault: Story = {
  args: {
    children: "기본 태그",
    variant: "pill",
    selected: false,
    changeOnClick: true,
  },
};

export const PillSelected: Story = {
  args: {
    children: "선택된 태그",
    variant: "pill",
    selected: true,
    changeOnClick: true,
  },
};

export const PillWideDefault: Story = {
  args: {
    children: "작은 태그",
    variant: "pill-wide",
    selected: false,
    changeOnClick: true,
  },
};

export const PillWideSelected: Story = {
  args: {
    children: "작은 태그 선택",
    variant: "pill-wide",
    selected: true,
    changeOnClick: true,
  },
};

export const PillStatic: Story = {
  args: {
    children: "고정 태그",
    variant: "pill-static",
    selected: false,
    changeOnClick: false,
  },
};

export const RoundedRect: Story = {
  args: {
    children: "사각 태그",
    variant: "rounded-rect",
    selected: false,
    changeOnClick: false,
  },
};