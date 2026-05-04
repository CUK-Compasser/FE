import { JsonValue } from "../core/types";
import type { SaleStatus } from "./common";

export interface RandomBoxCreateReqDTO {
  boxName?: string;
  content?: string;
  stock?: number;
  price?: number;
  buyLimit?: number;
  pickupTimeInfo?: JsonValue;
}

export interface RandomBoxUpdateReqDTO extends RandomBoxCreateReqDTO {
  saleStatus?: SaleStatus;
}

export interface RandomBoxRespDTO {
  boxId: number;
  storeId: number;
  boxName: string;
  stock: number;
  price: number;
  buyLimit: number;
  content: string;
  saleStatus: SaleStatus | string;
  pickupTimeInfo: string;
}