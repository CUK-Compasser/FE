import type { ApiResponse } from "../core/types";
import type { ReservationStatus, RoleType } from "./common";

export interface BusinessLicenseVerifyReqDTO {
  businessLicenseNumber: string;
  ownerName: string;
  startDate: string;
  businessName: string;
}

export interface OwnerUpgradeRespDTO {
  memberId: number;
  role: RoleType;
  storeId: number;
  alreadyUpgraded: boolean;
}

export interface ReservationReqDTO {
  status?: ReservationStatus;
  rejectReason?: string;
}

export interface ReservationDTO {
  reservationId: number;
  memberId: number;
  nickName: string;
  storeId: number;
  storeName: string;
  randomBoxId: number;
  randomBoxName: string;
  price: number;
  status: ReservationStatus;
  requestedQuantity: number;
  rejectReason?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ReservationListDTO {
  reservations: ReservationDTO[];
  count: number;
}

export type ReservationResponse = ApiResponse<ReservationDTO>;
export type ReservationListResponse = ApiResponse<ReservationListDTO>;