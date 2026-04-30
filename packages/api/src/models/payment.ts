import type { ApiResponse } from "../core/types";

export interface ReadyKakaoPayResultDTO {
  reservationId: number;
  tid: string;
  redirectUrl: string;
  paymentStatus: string;
}

export interface ApproveKakaoPayResultDTO {
  reservationId: number;
  paymentMethod: string;
  paymentStatus: string;
  approvedAt: string;
}

export type ReadyKakaoPayResponse = ApiResponse<ReadyKakaoPayResultDTO>;
export type CancelKakaoPayResponse = ApiResponse<Record<string, never>>;
export type ApproveKakaoPayResponse = ApiResponse<ApproveKakaoPayResultDTO>;