import type { HTMLAttributes } from "react";
import type { IconName } from "../../icons";

export type BottomTabKey = string;

export interface BottomTabItem {
  key: BottomTabKey;
  iconName: IconName;
  ariaLabel: string;
}

export interface BottomTabBarProps
  extends Omit<HTMLAttributes<HTMLElement>, "onChange"> {
  items: readonly BottomTabItem[];
  activeKey: BottomTabKey;
  onTabChange?: (key: BottomTabKey) => void;
  className?: string;
}