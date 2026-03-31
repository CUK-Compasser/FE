import type { ApiResponse, JsonValue } from "../core/types";
import type { StoreTag } from "./common";

export interface StoreUpdateReqDTO {
  storeName?: string;
  storeEmail?: string;
  bankName?: string;
  depositor?: string;
  bankAccount?: string;
  businessHours?: JsonValue;
}

export interface StoreLocationUpdateReqDTO {
  inputAddress?: string;
}

export interface StoreRespDTO {
  storeId: number;
  storeManagerId: number;
  storeName: string;
  storeDetails: string;
  inputAddress: string;
  roadAddress: string;
  jibunAddress: string;
  latitude: number;
  longitude: number;
  businessHours?: JsonValue;
  tag: StoreTag;
}

export interface GetStoreReqDTO {
  storeId: number;
  storeManagerId: number;
  storeName: string;
  storeImage?: string;
  tag: StoreTag;
  storeDetails: string;
  latitude: number;
  longitude: number;
  businessHours?: JsonValue;
}

export interface SimpleStoreInfoDTO {
  storeId: number;
  tag: StoreTag;
  storeName: string;
  roadAddress: string;
  jibunAddress: string;
  businessHours?: JsonValue;
}

export interface StoreListParams {
  userLat: number;
  userLon: number;
  page?: number;
}

export interface StoreTagListParams extends StoreListParams {
  tag: StoreTag;
}

export interface StoreAddressListParams {
  address: string;
  page?: number;
}

export type StoreListResponse = ApiResponse<GetStoreReqDTO[]>;
export type StoreDetailResponse = ApiResponse<StoreRespDTO>;
export type StoreSimpleResponse = ApiResponse<SimpleStoreInfoDTO>;
export type StoreByAddressResponse = ApiResponse<Record<string, unknown>>;