import type { HTMLAttributes } from "react";

export type TopTabKey = string;

export interface TopTabItem {
  key: TopTabKey;
  label: string;
}

export interface TopTabBarProps
  extends Omit<HTMLAttributes<HTMLElement>, "onChange"> {
  items: readonly TopTabItem[];
  activeKey: TopTabKey;
  onTabChange?: (key: TopTabKey) => void;
  className?: string;
}