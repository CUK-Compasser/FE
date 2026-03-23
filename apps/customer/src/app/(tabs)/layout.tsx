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

  const activeKey =
    pathname === "/main"
      ? "home"
      : pathname === "/order"
        ? "order"
        : pathname === "/mypage"
          ? "my"
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
    <div className="relative mx-auto min-h-screen w-full max-w-[42.5rem] bg-white">
      <div className="pb-[8.4rem]">{children}</div>

      <BottomTabBar
        items={tabItems}
        activeKey={activeKey}
        onTabChange={handleTabChange}
        className="max-w-[42.5rem]"
      />
    </div>
  );
}