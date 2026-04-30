"use client";

import { useQuery } from "@tanstack/react-query";
import { ownerModule } from "@/shared/api/api";

export const useSettlementPreviewQuery = () => {
  return useQuery(ownerModule.queries.settlementPreview());
};