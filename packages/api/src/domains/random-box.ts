import { queryOptions, type QueryClient } from "@tanstack/react-query";
import { createMutationWithCache } from "../core/mutation";
import { invalidatePrefix } from "../core/query-client";
import type { CompasserApi } from "../core/types";
import type {
  RandomBoxCreateReqDTO,
  RandomBoxRespDTO,
  RandomBoxUpdateReqDTO,
} from "../models/random-box";

export interface RandomBoxPathParams {
  storeId: number;
}

export interface RandomBoxUpdateParams extends RandomBoxPathParams {
  boxId: number;
  body: RandomBoxUpdateReqDTO;
}

export interface RandomBoxDeleteParams extends RandomBoxPathParams {
  boxId: number;
}

export interface RandomBoxCreateParams extends RandomBoxPathParams {
  body: RandomBoxCreateReqDTO;
}

export const createRandomBoxModule = (api: CompasserApi) => {
  const keys = {
    all: ["random-box"] as const,
    lists: (storeId: number) => [...keys.all, storeId, "list"] as const,
  };

  const requests = {
    list: async ({ storeId }: RandomBoxPathParams) => {
      const { data } = await api.privateClient.get<RandomBoxRespDTO[]>(
        `/stores/${storeId}/random-box`,
      );
      return data;
    },

    create: async ({ storeId, body }: RandomBoxCreateParams) => {
      const { data } = await api.privateClient.post<RandomBoxRespDTO>(
        `/stores/${storeId}/random-box`,
        body,
      );
      return data;
    },

    update: async ({ storeId, boxId, body }: RandomBoxUpdateParams) => {
      const { data } = await api.privateClient.patch<RandomBoxRespDTO>(
        `/stores/${storeId}/random-box/${boxId}`,
        body,
      );
      return data;
    },

    remove: async ({ storeId, boxId }: RandomBoxDeleteParams) => {
      await api.privateClient.delete(`/stores/${storeId}/random-box/${boxId}`);
    },
  };

  const queries = {
    list: ({ storeId }: RandomBoxPathParams) =>
      queryOptions({
        queryKey: keys.lists(storeId),
        queryFn: () => requests.list({ storeId }),
      }),
  };

  const mutations = {
    create: (queryClient: QueryClient) =>
      createMutationWithCache({
        queryClient,
        mutationKey: [...keys.all, "create"],
        mutationFn: requests.create,
        getActions: (createdBox, variables) => [
          {
            type: "merge",
            queryKey: keys.lists(variables.storeId),
            updater: (oldData) => {
              const prev = Array.isArray(oldData)
                ? (oldData as RandomBoxRespDTO[])
                : [];
              return [...prev, createdBox];
            },
          },
          {
            type: "invalidate",
            queryKey: keys.lists(variables.storeId),
          },
        ],
      }),

    update: (queryClient: QueryClient) =>
      createMutationWithCache({
        queryClient,
        mutationKey: [...keys.all, "update"],
        mutationFn: requests.update,
        getActions: (updatedBox, variables) => [
          {
            type: "merge",
            queryKey: keys.lists(variables.storeId),
            updater: (oldData) => {
              const prev = Array.isArray(oldData)
                ? (oldData as RandomBoxRespDTO[])
                : [];
              return prev.map((box) =>
                box.boxId === variables.boxId ? updatedBox : box,
              );
            },
          },
          {
            type: "invalidate",
            queryKey: keys.lists(variables.storeId),
          },
        ],
      }),

    remove: (queryClient: QueryClient) =>
      createMutationWithCache({
        queryClient,
        mutationKey: [...keys.all, "remove"],
        mutationFn: requests.remove,
        getActions: (_response, variables) => [
          {
            type: "merge",
            queryKey: keys.lists(variables.storeId),
            updater: (oldData) => {
              const prev = Array.isArray(oldData)
                ? (oldData as RandomBoxRespDTO[])
                : [];
              return prev.filter((box) => box.boxId !== variables.boxId);
            },
          },
          {
            type: "invalidate",
            queryKey: keys.lists(variables.storeId),
          },
        ],
      }),
  };

  const invalidate = {
    list: async (queryClient: QueryClient, storeId: number) =>
      invalidatePrefix(queryClient, keys.lists(storeId)),
  };

  return { keys, requests, queries, mutations, invalidate };
};