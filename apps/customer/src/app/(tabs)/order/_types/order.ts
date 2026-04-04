export type OrderTabKey = "in-progress" | "done";

export interface OrderItem {
  id: number;
  storeName: string;
  orderSummary: string;
  totalPrice: string;
  pickupTime: string;
}