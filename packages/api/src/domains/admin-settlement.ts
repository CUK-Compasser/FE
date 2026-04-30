// packages/api/src/domains/admin-settlement.ts

import type { QueryClient } from "@tanstack/react-query";

import { createMutationWithCache } from "../core/mutation";
import type { CompasserApi } from "../core/types";
import type {
  AdminSettlementCompleteReqDTO,
  AdminSettlementCompleteResponse,
} from "../models/admin-settlement";

export interface CompleteAdminSettlementParams {
  storeId: number;
  body: AdminSettlementCompleteReqDTO;
}

export const createAdminSettlementModule = (api: CompasserApi) => {
  const keys = {
    all: ["admin-settlement"] as const,
    complete: (storeId: number) => [...keys.all, "complete", storeId] as const,
  };

  const requests = {
    completeSettlement: async ({
      storeId,
      body,
    }: CompleteAdminSettlementParams) => {
      const { data } =
        await api.privateClient.post<AdminSettlementCompleteResponse>(
          `/admin/settlements/${storeId}/complete`,
          body,
        );

      return data;
    },
  };

  const mutations = {
    completeSettlement: (queryClient: QueryClient) =>
      createMutationWithCache({
        queryClient,
        mutationKey: [...keys.all, "complete"],
        mutationFn: requests.completeSettlement,
        getActions: (response, variables) => [
          {
            type: "set",
            queryKey: keys.complete(variables.storeId),
            value: response,
          },
          {
            type: "invalidate",
            queryKey: keys.all,
          },
        ],
      }),
  };

  return { keys, requests, mutations };
};