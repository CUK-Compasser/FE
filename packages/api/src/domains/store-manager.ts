import { type QueryClient } from "@tanstack/react-query";
import { createMutationWithCache } from "../core/mutation";
import type { CompasserApi } from "../core/types";
import type {
  QRCheckParams,
  QRCheckResponse,
  RewardRequestDTO,
  RewardResponse,
} from "../models/storeManager";

export const createStoreManagerModule = (api: CompasserApi) => {
  const keys = {
    all: ["store-manager"] as const,
    reward: () => [...keys.all, "reward"] as const,
    qrCheck: () => [...keys.all, "qr-check"] as const,
  };

  const requests = {
    writingReward: async (body: RewardRequestDTO) => {
      const { data } = await api.privateClient.post<RewardResponse>(
        "/store_manager/reward",
        body,
      );
      return data;
    },

    checkingQr: async ({ token, memberId }: QRCheckParams) => {
      const { data } = await api.privateClient.post<QRCheckResponse>(
        "/store_manager/qr-check",
        null,
        {
          params: {
            token,
            memberId,
          },
        },
      );

      return data;
    },
  };

  const mutations = {
    writingReward: (queryClient: QueryClient) =>
      createMutationWithCache({
        queryClient,
        mutationKey: keys.reward(),
        mutationFn: requests.writingReward,
        getActions: () => [
          {
            type: "invalidate",
            queryKey: ["member", "rewards"],
          },
          {
            type: "invalidate",
            queryKey: ["member", "my-page"],
          },
        ],
      }),

    checkingQr: (queryClient: QueryClient) =>
      createMutationWithCache({
        queryClient,
        mutationKey: keys.qrCheck(),
        mutationFn: requests.checkingQr,
      }),
  };

  return { keys, requests, mutations };
};