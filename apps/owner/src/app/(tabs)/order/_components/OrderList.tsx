"use client";

import ReservationCard from "./ReservationCard";
import OrderHistoryCard from "./OrderHistoryCard";
import type { OrderTabKey, ReservationItem } from "../_types/order";

interface OrderListProps {
  activeTab: OrderTabKey;
  orders: ReservationItem[];
  onAccept: (orderId: number) => void;
  onReject: (orderId: number) => void;
}

export default function OrderList({
  activeTab,
  orders,
  onAccept,
  onReject,
}: OrderListProps) {
  if (orders.length === 0) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="body1-m text-gray-600">주문 내역이 없어요.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-[1.2rem]">
      {activeTab === "reservation"
        ? orders.map((order) => (
          <ReservationCard
            key={order.id}
            order={order}
            onAccept={onAccept}
            onReject={onReject}
          />
        ))
        : orders.map((order) => (
          <OrderHistoryCard key={order.id} order={order} />
        ))}
    </div>
  );
}