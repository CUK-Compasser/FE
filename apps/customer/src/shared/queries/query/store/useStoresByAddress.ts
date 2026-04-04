"use client";

import { useQuery } from "@tanstack/react-query";
import { storeModule } from "@/shared/api/api";

export function useStoresByAddress(address: string, page = 0) {
  const trimmedAddress = address.trim();

  return useQuery({
    ...storeModule.queries.byAddress({
      address: trimmedAddress,
      page,
    }),
    enabled: Boolean(trimmedAddress),
  });
}