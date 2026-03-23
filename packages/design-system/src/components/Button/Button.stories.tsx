import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "./Button";

const meta = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  args: {
    children: "등록 완료",
    fullWidth: true,
    kind: "default",
  },
  argTypes: {
    variant: {
      control: "select",
      options: [
        "primary",
        "gray",
        "secondary",
        "outline-primary",
        "outline-gray",
      ],
    },
    size: {
      control: "select",
      options: ["lg", "sm"],
    },
    kind: {
      control: "select",
      options: ["default", "simple", "register", "move"],
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
    kind: "default",
    size: "lg",
    variant: "primary",
    pressed: false,
    disabled: false,
  },
};

export const LargePressed: Story = {
  args: {
    children: "등록 완료",
    kind: "default",
    size: "lg",
    variant: "primary",
    pressed: true,
    disabled: false,
  },
};

export const LargeDisabled: Story = {
  args: {
    children: "등록 완료",
    kind: "default",
    size: "lg",
    variant: "primary",
    disabled: true,
  },
};

export const SmallGray: Story = {
  args: {
    children: "그만두기",
    kind: "default",
    size: "sm",
    variant: "gray",
  },
};

export const SmallPrimary: Story = {
  args: {
    children: "로그아웃",
    kind: "default",
    size: "sm",
    variant: "primary",
  },
};

export const SmallSecondary: Story = {
  args: {
    children: "탈퇴하기",
    kind: "default",
    size: "sm",
    variant: "secondary",
  },
};

export const SimplePrimary: Story = {
  args: {
    children: "수락",
    kind: "simple",
    variant: "primary",
    fullWidth: false,
  },
};

export const SimpleOutlinePrimary: Story = {
  args: {
    children: "수락",
    kind: "simple",
    variant: "outline-primary",
    fullWidth: false,
  },
};

export const SimpleOutlineGray: Story = {
  args: {
    children: "거절",
    kind: "simple",
    variant: "outline-gray",
    fullWidth: false,
  },
};

export const RegisterOutlinePrimary: Story = {
  args: {
    children: "등록",
    kind: "register",
    variant: "outline-primary",
    fullWidth: false,
  },
};

export const RegisterOutlineGray: Story = {
  args: {
    children: "등록",
    kind: "register",
    variant: "outline-gray",
    fullWidth: false,
  },
};

export const MoveOutlinePrimary: Story = {
  args: {
    children: "이동",
    kind: "move",
    variant: "outline-primary",
    fullWidth: false,
  },
};

export const MoveOutlineGray: Story = {
  args: {
    children: "바로가기",
    kind: "move",
    variant: "outline-gray",
    fullWidth: false,
  },
};

export const Playground: Story = {
  args: {
    children: "버튼",
    kind: "default",
    size: "lg",
    variant: "primary",
    pressed: false,
    disabled: false,
    fullWidth: true,
  },
};