import { queryOptions, type QueryClient } from "@tanstack/react-query";
import { createMutationWithCache } from "../core/mutation";
import { invalidatePrefix } from "../core/query-client";
import type { CompasserApi } from "../core/types";
import type {
  StoreAddressListParams,
  StoreByAddressResponse,
  StoreDetailResponse,
  StoreListParams,
  StoreListResponse,
  StoreRespDTO,
  StoreSimpleResponse,
  StoreTagListParams,
  StoreUpdateReqDTO,
  StoreLocationUpdateReqDTO,
} from "../models/store";

export const createStoreModule = (api: CompasserApi) => {
  const keys = {
    all: ["stores"] as const,
    lists: () => [...keys.all, "list"] as const,
    list: (params: StoreListParams) => [...keys.lists(), params] as const,
    byTag: (params: StoreTagListParams) =>
      [...keys.lists(), "tag", params] as const,
    byAddress: (params: StoreAddressListParams) =>
      [...keys.lists(), "address", params] as const,
    details: () => [...keys.all, "detail"] as const,
    detail: (storeId: number) => [...keys.details(), storeId] as const,
    simple: (storeId: number) => [...keys.all, "simple", storeId] as const,
    myStore: () => [...keys.all, "my-store"] as const,
  };

  const requests = {
    getStoreList: async (params: StoreListParams) => {
      const { data } = await api.privateClient.get<StoreListResponse>(
        "/stores",
        { params },
      );
      return data;
    },

    getStoreDetail: async (storeId: number) => {
      const { data } = await api.privateClient.get<StoreDetailResponse>(
        `/stores/${storeId}`,
      );
      return data;
    },

    getStoreSimple: async (storeId: number) => {
      const { data } = await api.privateClient.get<StoreSimpleResponse>(
        `/stores/${storeId}/simple`,
      );
      return data;
    },

    getStoreListByTag: async ({ tag, ...params }: StoreTagListParams) => {
      const { data } = await api.privateClient.get<StoreListResponse>(
        `/stores/tag/${tag}`,
        {
          params,
        },
      );
      return data;
    },

    getStoreListByAddress: async (params: StoreAddressListParams) => {
      const { data } = await api.privateClient.get<StoreByAddressResponse>(
        "/stores/address",
        {
          params,
        },
      );
      return data;
    },

    getMyStore: async () => {
      const { data } = await api.privateClient.get<StoreRespDTO>(
        "/stores/owners/me/store",
      );
      return data;
    },

    patchMyStore: async (body: StoreUpdateReqDTO) => {
      const { data } = await api.privateClient.patch<StoreRespDTO>(
        "/stores/owners/me/store",
        body,
      );
      return data;
    },

    patchMyStoreLocation: async (body: StoreLocationUpdateReqDTO) => {
      const { data } = await api.privateClient.patch<StoreRespDTO>(
        "/stores/owners/me/store/location",
        body,
      );
      return data;
    },
  };

  const queries = {
    list: (params: StoreListParams) =>
      queryOptions({
        queryKey: keys.list(params),
        queryFn: async () => (await requests.getStoreList(params)).data,
      }),

    detail: (storeId: number) =>
      queryOptions({
        queryKey: keys.detail(storeId),
        queryFn: async () => (await requests.getStoreDetail(storeId)).data,
        enabled: Boolean(storeId),
      }),

    simple: (storeId: number) =>
      queryOptions({
        queryKey: keys.simple(storeId),
        queryFn: async () => (await requests.getStoreSimple(storeId)).data,
        enabled: Boolean(storeId),
      }),

    byTag: (params: StoreTagListParams) =>
      queryOptions({
        queryKey: keys.byTag(params),
        queryFn: async () => (await requests.getStoreListByTag(params)).data,
      }),

    byAddress: (params: StoreAddressListParams) =>
      queryOptions({
        queryKey: keys.byAddress(params),
        queryFn: async () =>
          (await requests.getStoreListByAddress(params)).data,
        enabled: Boolean(params.address),
      }),

    myStore: () =>
      queryOptions({
        queryKey: keys.myStore(),
        queryFn: requests.getMyStore,
      }),
  };

  const mutations = {
    patchMyStore: (queryClient: QueryClient) =>
      createMutationWithCache({
        queryClient,
        mutationKey: [...keys.all, "patch-my-store"],
        mutationFn: requests.patchMyStore,
        getActions: (updatedStore) => [
          {
            type: "set",
            queryKey: keys.myStore(),
            value: updatedStore,
          },
          {
            type: "set",
            queryKey: keys.detail(updatedStore.storeId),
            value: updatedStore,
          },
          {
            type: "invalidate",
            queryKey: keys.lists(),
          },
        ],
      }),

    patchMyStoreLocation: (queryClient: QueryClient) =>
      createMutationWithCache({
        queryClient,
        mutationKey: [...keys.all, "patch-my-store-location"],
        mutationFn: requests.patchMyStoreLocation,
        getActions: (updatedStore) => [
          {
            type: "set",
            queryKey: keys.myStore(),
            value: updatedStore,
          },
          {
            type: "set",
            queryKey: keys.detail(updatedStore.storeId),
            value: updatedStore,
          },
          {
            type: "invalidate",
            queryKey: keys.lists(),
          },
        ],
      }),
  };

  const invalidate = {
    all: async (queryClient: QueryClient) =>
      invalidatePrefix(queryClient, keys.all),

    lists: async (queryClient: QueryClient) =>
      invalidatePrefix(queryClient, keys.lists()),

    myStore: async (queryClient: QueryClient) =>
      invalidatePrefix(queryClient, keys.myStore()),

    detail: async (queryClient: QueryClient, storeId: number) =>
      invalidatePrefix(queryClient, keys.detail(storeId)),
  };

  return { keys, requests, queries, mutations, invalidate };
};