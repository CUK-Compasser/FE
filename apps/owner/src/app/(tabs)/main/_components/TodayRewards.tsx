"use client";

import { Card } from "@compasser/design-system";

interface TodayRewardsProps {
  couponUsedCount: number;
  stampSavedCount: number;
}

export default function TodayRewards({
  couponUsedCount,
  stampSavedCount,
}: TodayRewardsProps) {
  return (
    <section className="mt-[4rem]">
      <h2 className="body1-m text-default">오늘의 적립</h2>

      <div className="mt-[1.2rem] flex gap-[1.6rem]">
        <Card
          variant="inverse-elevated"
          className="flex w-full flex-col items-center justify-center px-[1rem] py-[2.15rem]"
        >
          <p className="body1-m text-center text-gray-700">쿠폰 사용 수</p>
          <p className="head1-sb mt-[2rem] text-center text-primary">
            {couponUsedCount}건
          </p>
        </Card>

        <Card
          variant="inverse-elevated"
          className="flex w-full flex-col items-center justify-center px-[1rem] py-[2.15rem]"
        >
          <p className="body1-m text-center text-gray-700">도장 적립 수</p>
          <p className="head1-sb mt-[2rem] text-center text-primary">
            {stampSavedCount}건
          </p>
        </Card>
      </div>
    </section>
  );
}