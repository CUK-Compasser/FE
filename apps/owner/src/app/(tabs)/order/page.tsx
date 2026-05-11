"use client";

import { useMemo, useState } from "react";
import { Header, TopTabBar } from "@compasser/design-system";
import OrderList from "./_components/OrderList";
import AcceptOrderModal from "./_components/modal/AcceptOrderModal";
import RejectOrderModal from "./_components/modal/RejectOrderModal";
import type {
  AcceptModalState,
  OrderTabKey,
  RejectModalState,
  ReservationItem,
} from "./_types/order";
import { usePendingReservationsQuery } from "@/shared/queries/query/owner/usePendingReservationsQuery";
import { useProcessedReservationsQuery } from "@/shared/queries/query/owner/useProcessedReservationsQuery";
import { useApproveReservationMutation } from "@/shared/queries/mutation/owner/useApproveReservationMutation";
import { useRejectReservationMutation } from "@/shared/queries/mutation/owner/useRejectReservationMutation";
import type { ReservationDTO } from "@compasser/api";

const formatPrice = (price: number) => `${price.toLocaleString()}원`;

const mapReservationStatus = (
  status: ReservationDTO["status"],
): ReservationItem["status"] => {
  switch (status) {
    case "REQUESTED":
      return "pending";
    case "APPROVED":
      return "completed";
    case "REJECTED":
      return "cancelled";
    case "CANCELED":
      return "refunded";
    default:
      return "pending";
  }
};

const mapReservationToItem = (
  reservation: ReservationDTO,
): ReservationItem => ({
  id: reservation.reservationId,
  customerName: reservation.customerName,
  orderDetail: reservation.randomBoxName,
  price: formatPrice(reservation.totalPrice),
  quantity: `${reservation.requestedQuantity}개`,
  status: mapReservationStatus(reservation.status),
  rejectReason: reservation.rejectReason,
});

export default function OrderStatusPage() {
  const [activeTab, setActiveTab] = useState<OrderTabKey>("reservation");

  const [acceptModal, setAcceptModal] = useState<AcceptModalState>({
    isOpen: false,
    orderId: null,
  });

  const [rejectModal, setRejectModal] = useState<RejectModalState>({
    isOpen: false,
    orderId: null,
  });

  const {
    data: pendingReservationData,
    isLoading: isPendingLoading,
    isError: isPendingError,
  } = usePendingReservationsQuery();

  const {
    data: processedReservationData,
    isLoading: isProcessedLoading,
    isError: isProcessedError,
  } = useProcessedReservationsQuery();

  const approveMutation = useApproveReservationMutation();
  const rejectMutation = useRejectReservationMutation();

  const isOrderTabKey = (key: string): key is OrderTabKey =>
    key === "reservation" || key === "order";

  const reservationOrders = useMemo(
    () =>
      pendingReservationData?.reservations.map(mapReservationToItem) ?? [],
    [pendingReservationData],
  );

  const processedOrders = useMemo(
    () =>
      processedReservationData?.reservations.map(mapReservationToItem) ?? [],
    [processedReservationData],
  );

  const currentOrders =
    activeTab === "reservation" ? reservationOrders : processedOrders;

  const isLoading =
    activeTab === "reservation" ? isPendingLoading : isProcessedLoading;

  const isError =
    activeTab === "reservation" ? isPendingError : isProcessedError;

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

    approveMutation.mutate(
      {
        reservationId: acceptModal.orderId,
      },
      {
        onSuccess: closeAcceptModal,
      },
    );
  };

  const handleRejectOrder = (reason: string) => {
    if (rejectModal.orderId === null) return;

    rejectMutation.mutate(
      {
        reservationId: rejectModal.orderId,
        body: {
          status: "REQUESTED",
          rejectReason: reason,
        },
      },
      {
        onSuccess: closeRejectModal,
      },
    );
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
          onTabChange={(key) => {
            if (isOrderTabKey(key)) setActiveTab(key);
          }}
        />

        <section className="flex-1 overflow-y-auto px-[1.6rem] pt-[2.8rem] pb-[10rem]">
          {isLoading ? (
            <div className="flex h-full items-center justify-center">
              <p className="body1-m text-gray-600">불러오는 중이에요.</p>
            </div>
          ) : isError ? (
            <div className="flex h-full items-center justify-center">
              <p className="body1-m text-gray-600">
                주문 내역을 불러오지 못했어요.
              </p>
            </div>
          ) : (
            <OrderList
              activeTab={activeTab}
              orders={currentOrders}
              onAccept={openAcceptModal}
              onReject={openRejectModal}
            />
          )}
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