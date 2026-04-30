import { queryOptions, type QueryClient } from "@tanstack/react-query";
import { createMutationWithCache } from "../core/mutation";
import { invalidatePrefix } from "../core/query-client";
import type { CompasserApi } from "../core/types";
import type {
  CancelOrderResponse,
  CreateOrderDTO,
  CreateOrderResponse,
  OrderListResponse,
  OrderListTab,
  OrderStatusResponse,
} from "../models/order";

export const createOrderModule = (api: CompasserApi) => {
  const keys = {
    all: ["orders"] as const,
    list: (tab: OrderListTab) => [...keys.all, "list", tab] as const,
    status: (orderId: number) => [...keys.all, orderId, "status"] as const,
  };

  const requests = {
    createOrder: async (body: CreateOrderDTO) => {
      const { data } = await api.privateClient.post<CreateOrderResponse>(
        "/orders",
        body,
      );
      return data;
    },

    getOrders: async (tab: OrderListTab) => {
      const { data } = await api.privateClient.get<OrderListResponse>(
        "/orders",
        {
          params: {
            tab,
          },
        },
      );
      return data;
    },

    cancelOrder: async (orderId: number) => {
      const { data } = await api.privateClient.patch<CancelOrderResponse>(
        `/orders/${orderId}/cancel`,
      );
      return data;
    },

    getOrderStatus: async (orderId: number) => {
      const { data } = await api.privateClient.get<OrderStatusResponse>(
        `/orders/${orderId}/status`,
      );
      return data;
    },
  };

  const queries = {
    list: (tab: OrderListTab) =>
      queryOptions({
        queryKey: keys.list(tab),
        queryFn: async () => {
          const response = await requests.getOrders(tab);
          return response.data.orders;
        },
      }),

    status: (orderId: number) =>
      queryOptions({
        queryKey: keys.status(orderId),
        queryFn: async () => (await requests.getOrderStatus(orderId)).data,
        enabled: Boolean(orderId),
      }),
  };

  const mutations = {
    createOrder: (queryClient: QueryClient) =>
      createMutationWithCache({
        queryClient,
        mutationKey: [...keys.all, "create"],
        mutationFn: requests.createOrder,
        getActions: () => [
          {
            type: "invalidate",
            queryKey: keys.all,
          },
        ],
      }),

    cancelOrder: (queryClient: QueryClient) =>
      createMutationWithCache({
        queryClient,
        mutationKey: [...keys.all, "cancel"],
        mutationFn: requests.cancelOrder,
        getActions: (_response, orderId) => [
          {
            type: "invalidate",
            queryKey: keys.status(orderId),
          },
          {
            type: "invalidate",
            queryKey: keys.all,
          },
        ],
      }),
  };

  const invalidate = {
    all: async (queryClient: QueryClient) =>
      invalidatePrefix(queryClient, keys.all),

    list: async (queryClient: QueryClient, tab: OrderListTab) =>
      invalidatePrefix(queryClient, keys.list(tab)),

    status: async (queryClient: QueryClient, orderId: number) =>
      invalidatePrefix(queryClient, keys.status(orderId)),
  };

  return { keys, requests, queries, mutations, invalidate };
};