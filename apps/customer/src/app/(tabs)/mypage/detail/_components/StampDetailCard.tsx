"use client";

import { Card } from "@compasser/design-system";
import type { StampDetail } from "../_types/stampDetail";

interface StampDetailCardProps {
  item: StampDetail;
}

export const StampDetailCard = ({ item }: StampDetailCardProps) => {
  return (
    <Card variant="default-blue-shadow">
      <div>
        <p className="head3-m text-default">{item.storeName}</p>

        <div className="mt-[0.8rem]">
          <div className="flex items-stretch">
            <div className="mr-[5.6rem] flex flex-col">
              <div className="flex items-center py-[0.35rem]">
                <p className="body1-m text-gray-700">쿠폰 사용 횟수</p>
              </div>

              <div className="flex items-center border-y border-gray-100 py-[0.35rem]">
                <p className="body1-m text-gray-700">남은 쿠폰 수</p>
              </div>

              <div className="flex items-center py-[0.35rem]">
                <p className="body1-m text-gray-700">적립 도장</p>
              </div>
            </div>

            <div className="flex flex-col items-start">
              <div className="flex items-center py-[0.35rem]">
                <p className="head3-m text-primary">{item.usedCouponCount}</p>
              </div>

              <div className="flex items-center border-y border-gray-100 py-[0.35rem]">
                <p className="head3-m text-primary">
                  {item.remainingCouponCount}
                </p>
              </div>

              <div className="flex items-center py-[0.35rem]">
                <span className="head3-m text-primary">{item.stampCount}</span>
                <span className="body2-m text-gray-700">
                  /{item.maxStampCount}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};