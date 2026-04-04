"use client";

import { useQuery } from "@tanstack/react-query";
import { randomBoxModule } from "@/shared/api/api";

export const useRandomBoxListQuery = (storeId?: number) => {
  return useQuery({
    ...randomBoxModule.queries.list({ storeId: storeId ?? 0 }),
    enabled: Boolean(storeId),
  });
};