import type { SaleStatus } from "./common";

export interface RandomBoxCreateReqDTO {
  boxName?: string;
  content?: string;
  stock?: number;
  price?: number;
  buyLimit?: number;
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
  saleStatus: string;
}