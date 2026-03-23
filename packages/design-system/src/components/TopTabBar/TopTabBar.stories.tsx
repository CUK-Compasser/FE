import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { TopTabBar } from "./TopTabBar";
import type { TopTabBarProps } from "./TopTabBar.types";

const meta: Meta<TopTabBarProps> = {
  title: "Components/TopTabBar",
  component: TopTabBar,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-full bg-inverse">
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<TopTabBarProps>;

const InteractiveTopTabBar = (args: TopTabBarProps) => {
  const [activeKey, setActiveKey] = useState(args.activeKey);

  return (
    <TopTabBar
      {...args}
      activeKey={activeKey}
      onTabChange={setActiveKey}
    />
  );
};

export const CustomerInteractive: Story = {
  render: (args) => <InteractiveTopTabBar {...args} />,
  args: {
    items: [
      { key: "in-progress", label: "진행 중" },
      { key: "done", label: "완료" },
    ],
    activeKey: "in-progress",
  },
};

export const OwnerInteractive: Story = {
  render: (args) => <InteractiveTopTabBar {...args} />,
  args: {
    items: [
      { key: "reservation", label: "예약" },
      { key: "order", label: "주문" },
    ],
    activeKey: "reservation",
  },
};

export const CustomerInProgress: Story = {
  args: {
    items: [
      { key: "in-progress", label: "진행 중" },
      { key: "done", label: "완료" },
    ],
    activeKey: "in-progress",
  },
};

export const CustomerDone: Story = {
  args: {
    items: [
      { key: "in-progress", label: "진행 중" },
      { key: "done", label: "완료" },
    ],
    activeKey: "done",
  },
};

export const OwnerReservation: Story = {
  args: {
    items: [
      { key: "reservation", label: "예약" },
      { key: "order", label: "주문" },
    ],
    activeKey: "reservation",
  },
};

export const OwnerOrder: Story = {
  args: {
    items: [
      { key: "reservation", label: "예약" },
      { key: "order", label: "주문" },
    ],
    activeKey: "order",
  },
};