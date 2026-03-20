import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { BottomTabBar } from "./BottomTabBar";
import type { BottomTabBarProps } from "./BottomTabBar.types";
import { IconSprite } from "../../icons";

const meta: Meta<BottomTabBarProps> = {
  title: "Components/BottomTabBar",
  component: BottomTabBar,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div>
        <IconSprite />
        <div className="w-full bg-inverse">
          <Story />
        </div>
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<BottomTabBarProps>;

const tabItems = [
  {
    key: "home",
    iconName: "Home",
    ariaLabel: "홈",
  },
  {
    key: "order",
    iconName: "Order",
    ariaLabel: "주문",
  },
  {
    key: "my",
    iconName: "My",
    ariaLabel: "마이",
  },
] as const;

const InteractiveBottomTabBar = (args: BottomTabBarProps) => {
  const [activeKey, setActiveKey] = useState(args.activeKey);

  return (
    <BottomTabBar
      {...args}
      activeKey={activeKey}
      onTabChange={setActiveKey}
    />
  );
};

export const Interactive: Story = {
  render: (args) => <InteractiveBottomTabBar {...args} />,
  args: {
    items: tabItems,
    activeKey: "home",
  },
};

export const HomeActive: Story = {
  args: {
    items: tabItems,
    activeKey: "home",
  },
};

export const OrderActive: Story = {
  args: {
    items: tabItems,
    activeKey: "order",
  },
};

export const MyActive: Story = {
  args: {
    items: tabItems,
    activeKey: "my",
  },
};