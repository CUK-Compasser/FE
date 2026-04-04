import type { ApiResponse } from "../core/types";

export interface JoinReqDTO {
  memberName: string;
  nickname: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export interface JoinRespDTO {
  memberName: string;
  email: string;
}

export interface LoginReqDTO {
  email: string;
  password: string;
}

export interface AccessTokenDTO {
  accessToken: string;
}

export type SignUpResponse = ApiResponse<JoinRespDTO>;
export type LoginResponse = ApiResponse<AccessTokenDTO>;
export type LogoutResponse = ApiResponse<Record<string, unknown>>;
export type KakaoLoginUrlResponse = ApiResponse<string>;
export type KakaoCallbackResponse = ApiResponse<Record<string, unknown>>;