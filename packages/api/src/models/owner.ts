import type { ApiResponse } from "../core/types";
import type { ReservationStatus, RoleType } from "./common";

export interface BusinessLicenseVerifyReqDTO {
  businessLicenseNumber?: string;
  email?: string;
}

export interface OwnerUpgradeRespDTO {
  memberId: number;
  role: RoleType;
  storeId: number;
  alreadyUpgraded: boolean;
}

export interface ReservationRejectReqDTO {
  status?: ReservationStatus;
  rejectReason: string;
}

export interface ReservationDTO {
  reservationId: number;
  memberId: number;
  customerName: string;
  storeId: number;
  storeName: string;
  randomBoxId: number;
  randomBoxName: string;
  totalPrice: number;
  status: ReservationStatus;
  requestedQuantity: number;
  rejectReason?: string;
}

export interface ReservationListDTO {
  reservations: ReservationDTO[];
}

export interface SettlementPreviewReservationDTO {
  reservationId: number;
  memberId: number;
  totalPrice: number;
  createdAt: string;
}

export interface SettlementPreviewDTO {
  storeId: number;
  storeName: string;
  count: number;
  totalAmount: number;
  reservations: SettlementPreviewReservationDTO[];
}

export type ReservationResponse = ApiResponse<ReservationDTO>;
export type ReservationListResponse = ApiResponse<ReservationListDTO>;