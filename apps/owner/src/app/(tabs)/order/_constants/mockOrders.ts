import type { ReservationItem } from "../_types/order";

export const INITIAL_RESERVATIONS: ReservationItem[] = [
  {
    id: 1,
    customerName: "김00",
    orderDetail: "랜덤박스 1레벨",
    price: "6,000원",
    quantity: "1개",
    status: "pending",
  },
  {
    id: 2,
    customerName: "고00",
    orderDetail: "랜덤박스 1레벨",
    price: "6,000원",
    quantity: "1개",
    status: "pending",
  },
  {
    id: 3,
    customerName: "이00",
    orderDetail: "랜덤박스 3레벨",
    price: "12,000원",
    quantity: "2개",
    status: "pending",
  },
  {
    id: 4,
    customerName: "박00",
    orderDetail: "랜덤박스 2레벨",
    price: "9,000원",
    quantity: "3개",
    status: "pending",
  }
];