"use client";

import { Card } from "@compasser/design-system";
import type { OrderItem } from "../_types/main.types";

interface TodayOrdersProps {
  orders: OrderItem[];
}

const formatNickname = (name: string) => {
  if (name.length <= 3) return `${name}님`;
  return `${name.slice(0, 2)}...님`;
};

const formatRandomBoxName = (name: string) => {
  if (name.length <= 11) return name;
  return `${name.slice(0, 10)}...`;
};

const formatPrice = (price: number) => `${price}원`;

export default function TodayOrders({ orders }: TodayOrdersProps) {
  return (
    <section className="mt-[6rem]">
      <h2 className="body1-m text-default">오늘의 주문</h2>

      <div className="mt-[1.2rem] flex flex-col gap-[0.8rem]">
        {orders.slice(0, 3).map((order) => (
          <Card
            key={order.id}
            variant="inverse-elevated"
            className="px-[1rem] py-[0.8rem]"
          >
            <div className="flex items-center">
              <span className="body1-r shrink-0 text-default">
                {formatNickname(order.customerName)}
              </span>

              <span className="body1-r ml-[2rem] min-w-0 flex-1 truncate text-default">
                {formatRandomBoxName(order.randomBoxName)}
              </span>

              <span className="body1-r ml-[1rem] shrink-0 text-default">
                {formatPrice(order.price)}
              </span>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}