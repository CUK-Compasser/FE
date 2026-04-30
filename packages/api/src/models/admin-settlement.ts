import type { ApiResponse } from "../core/types";

export interface AdminSettlementCompleteReqDTO {
  reservationIds: number[];
}

export interface AdminSettlementCompleteRespDTO {
  storeId: number;
  storeName: string;
  count: number;
  totalAmount: number;
  message: string;
}

export type AdminSettlementCompleteResponse =
  ApiResponse<AdminSettlementCompleteRespDTO>;