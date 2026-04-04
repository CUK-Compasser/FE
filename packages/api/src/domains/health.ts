import { queryOptions } from "@tanstack/react-query";
import type { CompasserApi } from "../core/types";

export const createHealthModule = (api: CompasserApi) => {
  const keys = {
    all: ["health"] as const,
  };

  const requests = {
    healthCheck: async () => {
      const { data } = await api.publicClient.get<string>("/health");
      return data;
    },
  };

  const queries = {
    healthCheck: () =>
      queryOptions({
        queryKey: keys.all,
        queryFn: requests.healthCheck,
      }),
  };

  return { keys, requests, queries };
};