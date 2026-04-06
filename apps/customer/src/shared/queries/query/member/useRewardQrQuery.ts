"use client";

import { useQuery } from "@tanstack/react-query";
import { memberModule } from "@/shared/api/api";

interface UseRewardQrQueryParams {
  enabled: boolean;
}

export const useRewardQrQuery = ({ enabled }: UseRewardQrQueryParams) => {
  return useQuery({
    ...memberModule.queries.qrTest(),
    enabled,
    refetchInterval: enabled ? 60000 : false,
  });
};