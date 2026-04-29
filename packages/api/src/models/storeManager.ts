import type { ApiResponse } from "../core/types";

export interface QRCheckParams {
  token: string;
  memberId: number;
}

export interface QRCheckResponseDTO {
  rewardId: number;
  storeId: number;
  memberId: number;
  nickname: string;
  email: string;
  randomBoxName: string;
  totalPrice: number;
  stamp: number;
  coupon: number;
}

export interface RewardRequestDTO {
  rewardId: number;
  storeId: number;
  memberId: number;
}

export type QRCheckResponse = ApiResponse<QRCheckResponseDTO>;
export type RewardResponse = ApiResponse<Record<string, unknown>>;