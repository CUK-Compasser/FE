"use client";

import CafeIntro from "./_components/CafeIntro";
import TodayOrders from "./_components/TodayOrders";
import TodayRewards from "./_components/TodayRewards";
import { useSettlementPreviewQuery } from "@/shared/queries/query/useSettlementPreviewQuery";

export default function OwnerMainPage() {
  const { data: settlementPreview, isLoading, isError } =
    useSettlementPreviewQuery();

  const orders =
    settlementPreview?.reservations.map((reservation) => ({
      id: reservation.reservationId,
      customerName: `회원 ${reservation.memberId}`,
      randomBoxName: `예약 #${reservation.reservationId}`,
      price: reservation.totalPrice,
    })) ?? [];

  if (isLoading) {
    return (
      <main className="bg-background min-h-full px-[1.6rem] pt-[5.6rem]">
        <p className="text-body2 text-gray-600">정산 정보를 불러오는 중입니다.</p>
      </main>
    );
  }

  if (isError || !settlementPreview) {
    return (
      <main className="bg-background min-h-full px-[1.6rem] pt-[5.6rem]">
        <p className="text-body2 text-gray-600">
          정산 정보를 불러오지 못했습니다.
        </p>
      </main>
    );
  }

  return (
    <main className="bg-background min-h-full px-[1.6rem] pt-[5.6rem]">
      <CafeIntro cafeName={settlementPreview.storeName} />

      <TodayOrders orders={orders} />

      <TodayRewards
        couponUsedCount={settlementPreview.count}
        stampSavedCount={settlementPreview.totalAmount}
      />
    </main>
  );
}