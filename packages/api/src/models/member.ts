import type { ApiResponse } from "../core/types";

export interface RewardListDTO {
  rewardId: number;
  points: number;
  storename: string;
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

export interface QRDTO {
  memberId?: number;
  token?: string;
}

export interface GetMemberRewardDTO {
  rewardId: number;
  storeId: number;
  memberId: number;
  nickname: string;
  stamp: number;
  coupon: number;
  createdAt: string;
}

export interface WritingRewardDTO {
  rewardId?: number;
  storeId?: number;
  memberId?: number;
}

export type RewardListResponse = ApiResponse<RewardListDTO[]>;
export type MyPageResponse = ApiResponse<MyPageRespDTO>;
export type GetMemberRewardResponse = ApiResponse<GetMemberRewardDTO>;
export type WritingRewardResponse = ApiResponse<Record<string, unknown>>;