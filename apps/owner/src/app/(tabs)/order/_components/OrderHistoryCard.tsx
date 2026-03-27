"use client";

import { Card } from "@compasser/design-system";
import type { ReservationItem } from "../_types/order";
import { getStatusClassName, getStatusLabel } from "../_utils/orderStatus";

interface OrderHistoryCardProps {
  order: ReservationItem;
}

export default function OrderHistoryCard({ order }: OrderHistoryCardProps) {
  return (
    <Card variant="default-black-shadow" className="w-full px-[1.6rem] py-[1.4rem]">
      <div className="flex flex-col">
        <div className="grid grid-cols-[7.2rem_1fr_auto] gap-y-[0.4rem] items-start">
          <span className="body1-m text-gray-700">주문자</span>
          <span className="body1-m text-default">{order.customerName}</span>
          <span className={getStatusClassName(order.status)}>
            {getStatusLabel(order.status)}
          </span>

          <span className="body1-m text-gray-700">주문내역</span>
          <span className="body1-m text-default col-span-2">{order.orderDetail}</span>

          <span className="body1-m text-gray-700">가격</span>
          <span className="body1-m text-default col-span-2">{order.price}</span>

          <span className="body1-m text-gray-700">수량</span>
          <span className="body1-m text-default col-span-2">{order.quantity}</span>
        </div>

        <div className="mt-[1.6rem] flex justify-end">
          <span className="body2-m text-gray-700">{order.processedAt}</span>
        </div>
      </div>
    </Card>
  );
}