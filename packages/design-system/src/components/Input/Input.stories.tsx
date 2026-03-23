import type { Meta, StoryObj } from "@storybook/react-vite";
import { Input } from "./Input";

const meta = {
  title: "Components/Input",
  component: Input,
  tags: ["autodocs"],
  args: {
    placeholder: "입력해주세요",
  },
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    inputStyle: "default",
    placeholder: "이메일을 입력해주세요",
  },
};

export const Password: Story = {
  args: {
    type: "password",
    inputStyle: "default",
    placeholder: "비밀번호를 입력해주세요",
  },
};

export const Error: Story = {
  args: {
    inputStyle: "default",
    placeholder: "이메일을 입력해주세요",
    error: true,
    errorMessage: "입력값을 다시 확인해주세요",
  },
};

export const Address: Story = {
  args: {
    inputStyle: "address",
    placeholder: "위치 입력",
  },
};

export const Disabled: Story = {
  args: {
    inputStyle: "default",
    placeholder: "입력할 수 없습니다",
    disabled: true,
  },
};