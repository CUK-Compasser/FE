import type { ReservationStatus } from "../_types/order";

export const getStatusLabel = (status: ReservationStatus) => {
  switch (status) {
    case "pending":
      return "확인 대기중";
    case "completed":
      return "거래완료";
    case "cancelled":
      return "거래취소";
    case "refunded":
      return "환불";
    default:
      return "";
  }
};

export const getStatusClassName = (status: ReservationStatus) => {
  switch (status) {
    case "pending":
      return "body1-m text-secondary";
    case "completed":
      return "body1-m text-primary";
    case "cancelled":
      return "body1-m text-gray-500";
    case "refunded":
      return "body1-m text-secondary";
    default:
      return "";
  }
};