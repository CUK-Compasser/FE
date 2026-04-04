"use client";

import { usePathname, useRouter } from "next/navigation";
import { BottomTabBar } from "@compasser/design-system";
import type { ReactNode } from "react";

interface TabsLayoutProps {
  children: ReactNode;
}

const tabItems = [
  { key: "home", ariaLabel: "홈", iconName: "Home" },
  { key: "order", ariaLabel: "주문", iconName: "Order" },
  { key: "my", ariaLabel: "마이페이지", iconName: "My" },
] as const;

export default function TabsLayout({ children }: TabsLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();

  const activeKey = pathname.startsWith("/mypage")
    ? "my"
    : pathname.startsWith("/order")
      ? "order"
      : pathname.startsWith("/main")
        ? "home"
        : "home";

  const handleTabChange = (key: string) => {
    if (key === "home") {
      router.push("/main");
      return;
    }

    if (key === "order") {
      router.push("/order");
      return;
    }

    if (key === "my") {
      router.push("/mypage");
    }
  };

  return (
    <div className="flex h-dvh w-full flex-col overflow-hidden bg-white">
      <div className="ds-scrollbar-hidden flex-1 overflow-y-auto">
        {children}
      </div>

      <BottomTabBar
        items={tabItems}
        activeKey={activeKey}
        onTabChange={handleTabChange}
        className="max-w-[42.5rem]"
      />
    </div>
  );
}