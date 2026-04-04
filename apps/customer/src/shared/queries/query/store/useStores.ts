"use client";

import { useQuery } from "@tanstack/react-query";
import { storeModule } from "@/shared/api/api";

export function useStores(userLat: number | null, userLon: number | null, page = 0) {
  return useQuery({
    ...storeModule.queries.list({
      userLat: userLat ?? 0,
      userLon: userLon ?? 0,
      page,
    }),
    enabled: userLat !== null && userLon !== null,
  });
}