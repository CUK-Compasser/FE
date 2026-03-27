export type OrderTabKey = "reservation" | "order";

export type ReservationStatus = "pending" | "completed" | "cancelled";

export interface ReservationItem {
  id: number;
  customerName: string;
  orderDetail: string;
  price: string;
  quantity: string;
  status: ReservationStatus;
  processedAt?: string;
}

export interface AcceptModalState {
  isOpen: boolean;
  orderId: number | null;
}

export interface RejectModalState {
  isOpen: boolean;
  orderId: number | null;
}