"use client";

import { Button, Card } from "@compasser/design-system";
import type { OrderItem } from "../_types/order";

interface OrderCardProps {
  order: OrderItem;
}

export default function OrderCard({ order }: OrderCardProps) {
  return (
    <Card variant="default-black-shadow" className="w-full">
      <div className="flex flex-col">
        <h2 className="head3-m text-default">{order.storeName}</h2>

        <div className="mt-[0.8rem] grid grid-cols-[11.8rem_1fr] gap-y-[0.4rem] body1-m text-gray-700">
          <span>주문 내역</span>
          <span>{order.orderSummary}</span>

          <span>총 결제금액</span>
          <span>{order.totalPrice}</span>

          <span>픽업 예정일</span>
          <span>{order.pickupTime}</span>
        </div>

        <div className="mt-[1.2rem]">
          <Button
            type="button"
            kind="move"
            variant="outline-primary"
            fullWidth={false}
          >
            해당 매장 추가 주문하러 가기
          </Button>
        </div>
      </div>
    </Card>
  );
}