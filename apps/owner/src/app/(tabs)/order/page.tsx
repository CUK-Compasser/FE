"use client";

import { useMemo, useState } from "react";
import { Header, TopTabBar } from "@compasser/design-system";
import OrderList from "./_components/OrderList";
import AcceptOrderModal from "./_components/modal/AcceptOrderModal";
import RejectOrderModal from "./_components/modal/RejectOrderModal";
import { INITIAL_RESERVATIONS } from "./_constants/mockOrders";
import { formatProcessedAt } from "./_utils/formatProcessAt";
import type {
  AcceptModalState,
  OrderTabKey,
  RejectModalState,
  ReservationItem,
} from "./_types/order";

export default function OrderStatusPage() {
  const [activeTab, setActiveTab] = useState<OrderTabKey>("reservation");
  const [orders, setOrders] = useState<ReservationItem[]>(INITIAL_RESERVATIONS);

  const [acceptModal, setAcceptModal] = useState<AcceptModalState>({
    isOpen: false,
    orderId: null,
  });

  const [rejectModal, setRejectModal] = useState<RejectModalState>({
    isOpen: false,
    orderId: null,
  });

  const reservationOrders = useMemo(
    () => orders.filter((order) => order.status === "pending"),
    [orders]
  );

  const completedOrders = useMemo(
    () => orders.filter((order) => order.status !== "pending"),
    [orders]
  );

  const currentOrders =
    activeTab === "reservation" ? reservationOrders : completedOrders;

  const openAcceptModal = (orderId: number) => {
    setAcceptModal({
      isOpen: true,
      orderId,
    });
  };

  const closeAcceptModal = () => {
    setAcceptModal({
      isOpen: false,
      orderId: null,
    });
  };

  const openRejectModal = (orderId: number) => {
    setRejectModal({
      isOpen: true,
      orderId,
    });
  };

  const closeRejectModal = () => {
    setRejectModal({
      isOpen: false,
      orderId: null,
    });
  };

  const handleAcceptOrder = () => {
    if (acceptModal.orderId === null) return;

    const now = formatProcessedAt(new Date());

    setOrders((prev) =>
      prev.map((order) =>
        order.id === acceptModal.orderId
          ? {
            ...order,
            status: "completed",
            processedAt: now,
          }
          : order
      )
    );

    closeAcceptModal();
  };

  const handleRejectOrder = (_reason: string) => {
    if (rejectModal.orderId === null) return;

    const now = formatProcessedAt(new Date());

    setOrders((prev) =>
      prev.map((order) =>
        order.id === rejectModal.orderId
          ? {
            ...order,
            status: "cancelled",
            processedAt: now,
          }
          : order
      )
    );

    closeRejectModal();
  };

  return (
    <>
      <main className="flex min-h-screen flex-col bg-white">
        <Header variant="center-title-shadow" title="주문 현황" />

        <TopTabBar
          items={[
            { key: "reservation", label: "예약" },
            { key: "order", label: "주문" },
          ]}
          activeKey={activeTab}
          onTabChange={(key) => setActiveTab(key as OrderTabKey)}
        />

        <section className="flex-1 overflow-y-auto px-[1.6rem] pt-[2.8rem] pb-[10rem]">
          <OrderList
            activeTab={activeTab}
            orders={currentOrders}
            onAccept={openAcceptModal}
            onReject={openRejectModal}
          />
        </section>
      </main>

      <AcceptOrderModal
        open={acceptModal.isOpen}
        onClose={closeAcceptModal}
        onConfirm={handleAcceptOrder}
      />

      <RejectOrderModal
        open={rejectModal.isOpen}
        onClose={closeRejectModal}
        onConfirm={handleRejectOrder}
      />
    </>
  );
}