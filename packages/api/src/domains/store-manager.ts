import { type QueryClient } from "@tanstack/react-query";
import { createMutationWithCache } from "../core/mutation";
import type { CompasserApi } from "../core/types";
import type {
  QRDTO,
  WritingRewardDTO,
  WritingRewardResponse,
  GetMemberRewardResponse,
} from "../models/member";

export const createStoreManagerModule = (api: CompasserApi) => {
  const keys = {
    all: ["store-manager"] as const,
  };

  const requests = {
    writingReward: async (body: WritingRewardDTO) => {
      const { data } = await api.privateClient.post<WritingRewardResponse>(
        "/store_manager/reward",
        body,
      );
      return data;
    },

    checkingQr: async (body: QRDTO) => {
      const { data } = await api.privateClient.get<GetMemberRewardResponse>(
        "/store_manager/qr-check",
        {
          data: body,
        },
      );
      return data;
    },
  };

  const mutations = {
    writingReward: (queryClient: QueryClient) =>
      createMutationWithCache({
        queryClient,
        mutationKey: [...keys.all, "writing-reward"],
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
        mutationKey: [...keys.all, "checking-qr"],
        mutationFn: requests.checkingQr,
      }),
  };

  return { keys, requests, mutations };
};