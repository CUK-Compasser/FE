import { queryOptions } from "@tanstack/react-query";
import type { CompasserApi } from "../core/types";
import type { MyPageResponse, RewardListResponse } from "../models/member";

export const createMemberModule = (api: CompasserApi) => {
  const keys = {
    all: ["member"] as const,
    rewards: () => [...keys.all, "rewards"] as const,
    myPage: () => [...keys.all, "my-page"] as const,
    qr: () => [...keys.all, "qr"] as const,
  };

  const requests = {
    getRewardList: async () => {
      const { data } = await api.privateClient.get<RewardListResponse>(
        "/members/reward",
      );
      return data;
    },

    getMyPage: async () => {
      const { data } = await api.privateClient.get<MyPageResponse>(
        "/members/my-page",
      );
      return data;
    },

    getRewardQR: async () => {
      const { data } = await api.privateClient.get<Blob>("/members/qr", {
        responseType: "blob",
      });
      return data;
    },
  };

  const queries = {
    rewards: () =>
      queryOptions({
        queryKey: keys.rewards(),
        queryFn: async () => (await requests.getRewardList()).data,
      }),

    myPage: () =>
      queryOptions({
        queryKey: keys.myPage(),
        queryFn: async () => (await requests.getMyPage()).data,
      }),

    qr: () =>
      queryOptions({
        queryKey: keys.qr(),
        queryFn: requests.getRewardQR,
      }),
  };

  return { keys, requests, queries };
};