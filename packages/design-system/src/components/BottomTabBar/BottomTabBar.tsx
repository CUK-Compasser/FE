"use client";

import clsx from "clsx";
import { Icon } from "../../icons";
import type { BottomTabBarProps } from "./BottomTabBar.types";

const ICON_SIZE = 20;
const shadowClass = "shadow-[0_-0.2rem_0.2rem_0_rgba(0,0,0,0.1)]";

export const BottomTabBar = ({
  items,
  activeKey,
  onTabChange,
  className,
  ...props
}: BottomTabBarProps) => {
  return (
    <nav
      className={clsx(
        "fixed bottom-0 left-1/2 z-50 flex w-full -translate-x-1/2 bg-inverse pb-[env(safe-area-inset-bottom)]",
        shadowClass,
        className
      )}
      aria-label="하단 탭바"
      {...props}
    >
      {items.map((item) => {
        const isActive = item.key === activeKey;

        return (
          <button
            key={item.key}
            type="button"
            aria-label={item.ariaLabel}
            aria-pressed={isActive}
            onClick={() => onTabChange?.(item.key)}
            className="relative flex w-1/3 items-center justify-center py-[2rem]"
          >
            <span
              className={clsx(
                "absolute left-0 top-0 h-[0.15rem] w-full",
                isActive ? "bg-primary" : "bg-transparent"
              )}
            />

            <Icon
              name={item.iconName}
              height={ICON_SIZE}
              ariaHidden={false}
              className={clsx(
                "transition-colors",
                isActive ? "text-primary" : "text-gray-600"
              )}
            />
          </button>
        );
      })}
    </nav>
  );
};