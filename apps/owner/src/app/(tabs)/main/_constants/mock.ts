import type { OrderItem } from "../_types/main.types";

export const MOCK_CAFE_NAME = "별동네 베이커리카페 별내본점";

export const MOCK_ORDERS: OrderItem[] = [
  {
    id: 1,
    customerName: "감자링",
    randomBoxName: "랜덤박스 1레벨 주문",
    price: 5000,
  },
  {
    id: 2,
    customerName: "역곡역앞",
    randomBoxName: "랜덤박스 1레벨 주문",
    price: 10000,
  },
  {
    id: 3,
    customerName: "하루이틀삼일",
    randomBoxName: "랜덤박스 1레벨 주문",
    price: 20000,
  },
];

export const MOCK_REWARD_SUMMARY = {
  couponUsedCount: 1,
  stampSavedCount: 10,
};