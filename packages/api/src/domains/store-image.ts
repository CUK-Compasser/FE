import { queryOptions, type QueryClient } from "@tanstack/react-query";
import { createMutationWithCache } from "../core/mutation";
import { invalidatePrefix } from "../core/query-client";
import type { CompasserApi } from "../core/types";
import type { StoreImageRespDTO } from "../models/store-image";

export const createStoreImageModule = (api: CompasserApi) => {
  const keys = {
    all: ["store-image"] as const,
    mine: () => [...keys.all, "mine"] as const,
  };

  const requests = {
    get: async () => {
      const { data } = await api.privateClient.get<StoreImageRespDTO>(
        "/owners/me/store/image",
      );
      return data;
    },

    remove: async () => {
      await api.privateClient.delete("/owners/me/store/image");
    },

    upload: async (storeImage: File) => {
      const formData = new FormData();
      formData.append("storeImage", storeImage);

      const { data } = await api.privateClient.patch<StoreImageRespDTO>(
        "/owners/me/store/image",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      return data;
    },
  };

  const queries = {
    get: () =>
      queryOptions({
        queryKey: keys.mine(),
        queryFn: requests.get,
      }),
  };

  const mutations = {
    remove: (queryClient: QueryClient) =>
      createMutationWithCache({
        queryClient,
        mutationKey: [...keys.all, "remove"],
        mutationFn: requests.remove,
        getActions: () => [
          {
            type: "remove",
            queryKey: keys.mine(),
          },
        ],
      }),

    upload: (queryClient: QueryClient) =>
      createMutationWithCache({
        queryClient,
        mutationKey: [...keys.all, "upload"],
        mutationFn: requests.upload,
        getActions: (uploadedImage) => [
          {
            type: "set",
            queryKey: keys.mine(),
            value: uploadedImage,
          },
        ],
      }),
  };

  const invalidate = {
    mine: async (queryClient: QueryClient) =>
      invalidatePrefix(queryClient, keys.mine()),
  };

  return { keys, requests, queries, mutations, invalidate };
};