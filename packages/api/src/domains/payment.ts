import { queryOptions, type QueryClient } from "@tanstack/react-query";
import { createMutationWithCache } from "../core/mutation";
import type { CompasserApi } from "../core/types";
import type {
  ApproveKakaoPayResponse,
  CancelKakaoPayResponse,
  ReadyKakaoPayResponse,
} from "../models/payment";

export interface ReservationPaymentPath {
  reservationId: number;
}

export interface ApprovePaymentParams extends ReservationPaymentPath {
  pg_token: string;
}

export const createPaymentModule = (api: CompasserApi) => {
  const keys = {
    all: ["reservation-payment"] as const,
    ready: (reservationId: number) =>
      [...keys.all, reservationId, "ready"] as const,
  };

  const requests = {
    readyKakaoPay: async ({ reservationId }: ReservationPaymentPath) => {
      const { data } = await api.privateClient.post<ReadyKakaoPayResponse>(
        `/reservations/${reservationId}/payment/ready`,
      );
      return data;
    },

    cancelKakaoPay: async ({ reservationId }: ReservationPaymentPath) => {
      const { data } = await api.privateClient.post<CancelKakaoPayResponse>(
        `/reservations/${reservationId}/payment/cancel`,
      );
      return data;
    },

    approveKakaoPay: async ({
      reservationId,
      pg_token,
    }: ApprovePaymentParams) => {
      const { data } = await api.privateClient.post<ApproveKakaoPayResponse>(
        `/reservations/${reservationId}/payment/approve`,
        undefined,
        {
          params: { pg_token },
        },
      );
      return data;
    },

    callbackSuccess: async ({
      reservationId,
      pg_token,
    }: ApprovePaymentParams) => {
      const { data } = await api.privateClient.get(
        "/payments/kakaopay/success",
        {
          params: { reservationId, pg_token },
        },
      );
      return data;
    },

    callbackFail: async ({ reservationId }: ReservationPaymentPath) => {
      const { data } = await api.privateClient.get("/payments/kakaopay/fail", {
        params: { reservationId },
      });
      return data;
    },

    callbackCancel: async ({ reservationId }: ReservationPaymentPath) => {
      const { data } = await api.privateClient.get(
        "/payments/kakaopay/cancel",
        {
          params: { reservationId },
        },
      );
      return data;
    },
  };

  const queries = {
    ready: ({ reservationId }: ReservationPaymentPath) =>
      queryOptions({
        queryKey: keys.ready(reservationId),
        queryFn: async () =>
          (await requests.readyKakaoPay({ reservationId })).data,
        enabled: Boolean(reservationId),
      }),
  };

  const mutations = {
    readyKakaoPay: (queryClient: QueryClient) =>
      createMutationWithCache({
        queryClient,
        mutationKey: [...keys.all, "ready"],
        mutationFn: requests.readyKakaoPay,
        getActions: (response, variables) => [
          {
            type: "set",
            queryKey: keys.ready(variables.reservationId),
            value: response.data,
          },
        ],
      }),

    cancelKakaoPay: (queryClient: QueryClient) =>
      createMutationWithCache({
        queryClient,
        mutationKey: [...keys.all, "cancel"],
        mutationFn: requests.cancelKakaoPay,
        getActions: (_response, variables) => [
          {
            type: "remove",
            queryKey: keys.ready(variables.reservationId),
          },
          {
            type: "invalidate",
            queryKey: keys.all,
          },
        ],
      }),

    approveKakaoPay: (queryClient: QueryClient) =>
      createMutationWithCache({
        queryClient,
        mutationKey: [...keys.all, "approve"],
        mutationFn: requests.approveKakaoPay,
        getActions: (_response, variables) => [
          {
            type: "remove",
            queryKey: keys.ready(variables.reservationId),
          },
          {
            type: "invalidate",
            queryKey: keys.all,
          },
        ],
      }),

    callbackSuccess: (queryClient: QueryClient) =>
      createMutationWithCache({
        queryClient,
        mutationKey: [...keys.all, "callback-success"],
        mutationFn: requests.callbackSuccess,
        getActions: (_response, variables) => [
          {
            type: "remove",
            queryKey: keys.ready(variables.reservationId),
          },
          {
            type: "invalidate",
            queryKey: keys.all,
          },
        ],
      }),

    callbackFail: (queryClient: QueryClient) =>
      createMutationWithCache({
        queryClient,
        mutationKey: [...keys.all, "callback-fail"],
        mutationFn: requests.callbackFail,
        getActions: (_response, variables) => [
          {
            type: "remove",
            queryKey: keys.ready(variables.reservationId),
          },
          {
            type: "invalidate",
            queryKey: keys.all,
          },
        ],
      }),

    callbackCancel: (queryClient: QueryClient) =>
      createMutationWithCache({
        queryClient,
        mutationKey: [...keys.all, "callback-cancel"],
        mutationFn: requests.callbackCancel,
        getActions: (_response, variables) => [
          {
            type: "remove",
            queryKey: keys.ready(variables.reservationId),
          },
          {
            type: "invalidate",
            queryKey: keys.all,
          },
        ],
      }),
  };

  return { keys, requests, queries, mutations };
};