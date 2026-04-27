import type { ApiResponse } from "../core/types";
import type { BankType } from "./common";

export interface CreateOrderDTO {
  randomBoxId: number;
  quantity: number;
}

export interface CreateOrderResultDTO {
  reservationId: number;
  storeId: number;
  storeName: string;
  randomBoxId: number;
  randomBoxName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  orderStatus: string;
  reservationStatus: string;
  paymentStatus: string;
  pickupStatus: string;
  memberBankType?: BankType;
  depositBankType?: BankType;
  depositAccountNumber?: string;
  depositAccountHolder?: string;
  businessHours?: string;
  createdAt: string;
}

export interface CancelOrderResultDTO {
  reservationId: number;
  orderStatus: string;
  reservationStatus: string;
  paymentStatus: string;
  pickupStatus: string;
  message: string;
}

export interface OrderStatusDTO {
  reservationId: number;
  storeId: number;
  storeName: string;
  randomBoxId: number;
  randomBoxName: string;
  quantity: number;
  totalPrice: number;
  orderStatus: string;
  reservationStatus: string;
  paymentStatus: string;
  pickupStatus: string;
  memberBankType?: BankType;
  depositBankType?: BankType;
  depositAccountNumber?: string;
  depositAccountHolder?: string;
  businessHours?: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * GET /orders
 * 사용자 주문 리스트 조회
 */
export interface OrderListItemDTO {
  reservationId: number;
  storeId: number;
  storeName: string;
  randomBoxId: number;
  randomBoxName: string;
  quantity: number;
  totalPrice: number;
  pickupTimeText: string;
}

export interface OrderListDTO {
  orders: OrderListItemDTO[];
}

export type CreateOrderResponse = ApiResponse<CreateOrderResultDTO>;
export type CancelOrderResponse = ApiResponse<CancelOrderResultDTO>;
export type OrderStatusResponse = ApiResponse<OrderStatusDTO>;
export type OrderListResponse = ApiResponse<OrderListDTO>;