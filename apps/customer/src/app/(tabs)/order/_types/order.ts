import type { OrderListItemDTO } from "@compasser/api";

export type OrderTabKey = "in-progress" | "done";

export type OrderCardItem = OrderListItemDTO & {
  id: number;

  // TODO: 서버에서 진행 중 / 완료 상태값 내려오면 실제 상태로 교체
  status: OrderTabKey;
};