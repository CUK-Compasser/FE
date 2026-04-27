"use client";

import { useMemo, useState } from "react";
import { Header, TopTabBar } from "@compasser/design-system";
import OrderCard from "./_components/OrderCard";
import { useOrderListQuery } from "@/shared/queries/query/order/useOrderListQuery";
import type { OrderCardItem, OrderTabKey } from "./_types/order";

export default function OrderPage() {
  const [activeTab, setActiveTab] = useState<OrderTabKey>("ONGOING");

  const { data: orderList = [], isLoading, isError } =
    useOrderListQuery(activeTab);

  const orders = useMemo<OrderCardItem[]>(
    () =>
      orderList.map((order) => ({
        ...order,
        id: order.reservationId,
      })),
    [orderList],
  );

  const isOrderTabKey = (key: string): key is OrderTabKey =>
    key === "ONGOING" || key === "COMPLETED";

  return (
    <main className="flex flex-col bg-white">
      <Header variant="center-title-shadow" title="주문 현황" />

      <TopTabBar
        items={[
          { key: "ONGOING", label: "진행 중" },
          { key: "COMPLETED", label: "완료" },
        ]}
        activeKey={activeTab}
        onTabChange={(key) => {
          if (isOrderTabKey(key)) {
            setActiveTab(key);
          }
        }}
      />

      <section className="flex-1 overflow-y-auto px-[1.6rem] pt-[3.2rem] pb-[9.6rem]">
        {isLoading ? (
          <div className="flex h-full items-center justify-center">
            <p className="body1-m text-gray-600">
              주문 내역을 불러오는 중이에요.
            </p>
          </div>
        ) : isError ? (
          <div className="flex h-full items-center justify-center">
            <p className="body1-m text-gray-600">
              주문 내역을 불러오지 못했어요.
            </p>
          </div>
        ) : orders.length > 0 ? (
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