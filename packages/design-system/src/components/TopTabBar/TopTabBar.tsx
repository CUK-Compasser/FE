"use client";

import clsx from "clsx";
import type { TopTabBarProps } from "./TopTabBar.types";

export const TopTabBar = ({
  items,
  activeKey,
  onTabChange,
  className,
  ...props
}: TopTabBarProps) => {
  return (
    <div className={clsx("flex w-full bg-white", className)} role="tablist" {...props}>
      {items.map((item) => {
        const isActive = item.key === activeKey;

        return (
          <button
            key={item.key}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onTabChange?.(item.key)}
            className={clsx(
              "flex w-1/2 items-center justify-center py-[1rem] transition-colors",
              isActive
                ? "border-b-[0.2rem] border-primary text-primary body1-m"
                : "border-b border-gray-200 text-gray-600 body1-r"
            )}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
};