"use client";

import { useState } from "react";
import { Header, TopTabBar } from "@compasser/design-system";
import OrderCard from "./_components/OrderCard";
import { DONE_ORDERS, IN_PROGRESS_ORDERS } from "./_constants/mockOrders";
import type { OrderTabKey } from "./_types/order";

export default function OrderPage() {
  const [activeTab, setActiveTab] = useState<OrderTabKey>("in-progress");

  const orders =
    activeTab === "in-progress" ? IN_PROGRESS_ORDERS : DONE_ORDERS;

  return (
    <main className="flex h-screen flex-col bg-white">
      <Header variant="center-title-shadow" title="주문 현황" />

      <TopTabBar
        items={[
          { key: "in-progress", label: "진행 중" },
          { key: "done", label: "완료" },
        ]}
        activeKey={activeTab}
        onTabChange={(key) => setActiveTab(key as OrderTabKey)}
      />

      <section className="flex-1 overflow-y-auto px-[1.6rem] pt-[3.2rem] pb-[3.2rem]">
        {orders.length > 0 ? (
          <div className="flex flex-col gap-[1.2rem]">
            {orders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        ) : (
          <div className="flex h-full items-center justify-center">
            <p className="body1-m text-gray-600">주문 내역이 없어요.</p>
          </div>
        )}
      </section>
    </main>
  );
}