import type { Meta, StoryObj } from "@storybook/react-vite";
import { Header } from "./Header";
import type { HeaderProps } from "./Header.types";
import { IconSprite } from "../../icons";

const meta: Meta<HeaderProps> = {
  title: "Components/Header",
  component: Header,
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

type Story = StoryObj<HeaderProps>;

export const LocationSearch: Story = {
  args: {
    variant: "location-search",
    placeholder: "청주 성안길",
  },
};

export const BackTitle: Story = {
  args: {
    variant: "back-title",
    title: "적립",
  },
};

export const CenterTitleShadow: Story = {
  args: {
    variant: "center-title-shadow",
    title: "적립",
  },
};

export const CenterTitle: Story = {
  args: {
    variant: "center-title",
    title: "적립",
  },
};

export const CloseTitle: Story = {
  args: {
    variant: "close-title",
    title: "적립",
  },
};