"use client";

import CafeIntro from "./_components/CafeIntro";
import TodayOrders from "./_components/TodayOrders";
import TodayRewards from "./_components/TodayRewards";
import {
  MOCK_CAFE_NAME,
  MOCK_ORDERS,
  MOCK_REWARD_SUMMARY,
} from "./_constants/mock";

export default function OwnerMainPage() {
  return (
    <main className="bg-background min-h-full px-[1.6rem] pt-[5.6rem]">
      <CafeIntro cafeName={MOCK_CAFE_NAME} />

      <TodayOrders orders={MOCK_ORDERS} />

      <TodayRewards
        couponUsedCount={MOCK_REWARD_SUMMARY.couponUsedCount}
        stampSavedCount={MOCK_REWARD_SUMMARY.stampSavedCount}
      />
    </main>
  );
}