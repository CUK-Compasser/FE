import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "./Button";

const meta = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  args: {
    children: "등록 완료",
    fullWidth: true,
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "gray", "secondary"],
    },
    size: {
      control: "select",
      options: ["lg", "sm"],
    },
    pressed: {
      control: "boolean",
    },
    disabled: {
      control: "boolean",
    },
    fullWidth: {
      control: "boolean",
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 375 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const LargePrimary: Story = {
  args: {
    children: "등록 완료",
    size: "lg",
    variant: "primary",
    pressed: false,
    disabled: false,
  },
};

export const LargePressed: Story = {
  args: {
    children: "등록 완료",
    size: "lg",
    variant: "primary",
    pressed: true,
    disabled: false,
  },
};

export const LargeDisabled: Story = {
  args: {
    children: "등록 완료",
    size: "lg",
    variant: "primary",
    disabled: true,
  },
};

export const SmallGray: Story = {
  args: {
    children: "그만두기",
    size: "sm",
    variant: "gray",
  },
};

export const SmallPrimary: Story = {
  args: {
    children: "로그아웃",
    size: "sm",
    variant: "primary",
  },
};

export const SmallSecondary: Story = {
  args: {
    children: "탈퇴하기",
    size: "sm",
    variant: "secondary",
  },
};

export const Playground: Story = {
  args: {
    children: "버튼",
    size: "lg",
    variant: "primary",
    pressed: false,
    disabled: false,
    fullWidth: true,
  },
};