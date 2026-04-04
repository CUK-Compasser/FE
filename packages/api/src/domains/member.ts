import { queryOptions } from "@tanstack/react-query";
import type { CompasserApi } from "../core/types";
import type {
  GetMemberRewardResponse,
  MyPageResponse,
  QRDTO,
  RewardListResponse,
} from "../models/member";

export const createMemberModule = (api: CompasserApi) => {
  const keys = {
    all: ["member"] as const,
    rewards: () => [...keys.all, "rewards"] as const,
    myPage: () => [...keys.all, "my-page"] as const,
    qrTest: () => [...keys.all, "qr-test"] as const,
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

    getRewardQRTest: async () => {
      const { data } = await api.privateClient.get<Blob>("/members/qr/test", {
        responseType: "blob",
      });
      return data;
    },

    getMemberRewardByQr: async (body: QRDTO) => {
      const { data } = await api.privateClient.get<GetMemberRewardResponse>(
        "/store_manager/qr-check",
        {
          data: body,
        },
      );
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

    qrTest: () =>
      queryOptions({
        queryKey: keys.qrTest(),
        queryFn: requests.getRewardQRTest,
      }),
  };

  return { keys, requests, queries };
};