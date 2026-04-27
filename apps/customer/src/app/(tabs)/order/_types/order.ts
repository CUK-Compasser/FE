import type { OrderListItemDTO } from "@compasser/api";

export type OrderTabKey = "ONGOING" | "COMPLETED";

export type OrderCardItem = OrderListItemDTO & {
  id: number;
};