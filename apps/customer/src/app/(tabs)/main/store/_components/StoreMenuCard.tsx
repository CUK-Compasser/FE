"use client";

import { Card, Icon } from "@compasser/design-system";
import type { StoreMenuItem } from "../_types/store-detail";

interface StoreMenuCardProps {
  item: StoreMenuItem;
  onClick?: () => void;
}

const formatPrice = (price: number) => `${price.toLocaleString()}원`;

export default function StoreMenuCard({
  item,
  onClick,
}: StoreMenuCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="block w-full text-left"
    >
      <Card variant="default">
        <div className="flex">
          <div className="flex h-[11rem] w-[11rem] shrink-0 items-center justify-center rounded-[8px] bg-background">
            <Icon name="Gift" width={80} height={80} ariaHidden={false} />
          </div>

          <div className="ml-[0.6rem] flex min-w-0 flex-1 flex-col">
            <p className="body1-m text-default">{item.name}</p>

            <p className="mt-[0.2rem] body2-r text-gray-600">
              잔여개수 {item.remainingCount}개
            </p>

            <p className="mt-[0.2rem] body2-r text-gray-600">
              픽업시간: {item.pickupStartTime} ~ {item.pickupEndTime}
            </p>

            <div className="mt-auto flex justify-end">
              <span className="body1-m text-secondary">
                {formatPrice(item.price)}
              </span>
            </div>
          </div>
        </div>
      </Card>
    </button>
  );
}