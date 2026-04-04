"use client";

import { useQuery } from "@tanstack/react-query";
import { storeModule } from "@/shared/api/api";

export function useStoreSimple(storeId: number | null) {
  return useQuery({
    ...storeModule.queries.simple(storeId ?? 0),
    enabled: Boolean(storeId),
  });
}