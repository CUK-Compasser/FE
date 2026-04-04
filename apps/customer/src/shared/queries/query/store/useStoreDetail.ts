"use client";

import { useQuery } from "@tanstack/react-query";
import { storeModule } from "@/shared/api/api";

export function useStoreDetail(storeId: number) {
  return useQuery({
    ...storeModule.queries.detail(storeId),
    enabled: Boolean(storeId),
  });
}