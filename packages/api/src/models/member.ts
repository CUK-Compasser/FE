import type { ApiResponse } from "../core/types";

export interface RewardListDTO {
  storeName: string;
  stamp: number;
  coupon: number;
  useCouponCnt: number;
}

export interface MyPageRespDTO {
  memberName: string;
  nickname: string;
  email: string;
  profileImageUrl?: string;
  totalStampCount: number;
  totalUnboxingCount: number;
  totalCouponCount: number;
}

export type RewardListResponse = ApiResponse<RewardListDTO[]>;
export type MyPageResponse = ApiResponse<MyPageRespDTO>;