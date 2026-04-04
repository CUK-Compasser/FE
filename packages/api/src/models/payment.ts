import type { ApiResponse } from "../core/types";

export interface ReadyResultDTO {
  reservationId: number;
  tid: string;
  redirectUrl: string;
  paymentStatus: string;
}

export interface ApproveResultDTO {
  reservationId: number;
  paymentMethod: string;
  paymentStatus: string;
  approvedAt: string;
}

export type ReadyKakaoPayResponse = ApiResponse<ReadyResultDTO>;
export type CancelKakaoPayResponse = ApiResponse<Record<string, unknown>>;
export type ApproveKakaoPayResponse = ApiResponse<ApproveResultDTO>;