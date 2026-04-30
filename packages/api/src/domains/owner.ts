import { queryOptions, type QueryClient } from "@tanstack/react-query";
import { createMutationWithCache } from "../core/mutation";
import { invalidatePrefix } from "../core/query-client";
import type { CompasserApi } from "../core/types";
import type {
  BusinessLicenseVerifyReqDTO,
  OwnerUpgradeRespDTO,
  ReservationListResponse,
  ReservationReqDTO,
  ReservationResponse,
} from "../models/owner";

export interface ReservationDecisionParams {
  reservationId: number;
  body?: ReservationReqDTO;
}

export const createOwnerModule = (api: CompasserApi) => {
  const keys = {
    all: ["owner"] as const,
    upgrade: () => [...keys.all, "upgrade"] as const,
    reservations: () => [...keys.all, "reservations"] as const,
    pendingReservations: () => [...keys.reservations(), "pending"] as const,
    processedReservations: () => [...keys.reservations(), "processed"] as const,
  };

  const requests = {
    verifyBizAndUpgrade: async (body: BusinessLicenseVerifyReqDTO) => {
      const { data } = await api.privateClient.post<OwnerUpgradeRespDTO>(
        "/owners/auth/business-license/verify",
        body,
      );
      return data;
    },

    upgradeToStoreManager: async () => {
      const { data } = await api.privateClient.patch<OwnerUpgradeRespDTO>(
        "/owners/upgrade",
      );
      return data;
    },

    getPendingReservations: async () => {
      const { data } = await api.privateClient.get<ReservationListResponse>(
        "/owners/my-store/reservations",
      );
      return data;
    },

    getProcessedReservations: async () => {
      const { data } = await api.privateClient.get<ReservationListResponse>(
        "/owners/my-store/reservations/processed",
      );
      return data;
    },

    approveReservation: async ({ reservationId }: ReservationDecisionParams) => {
      const { data } = await api.privateClient.patch<ReservationResponse>(
        `/owners/my-store/reservations/${reservationId}/approve`,
      );
      return data;
    },

    rejectReservation: async ({
      reservationId,
      body,
    }: ReservationDecisionParams) => {
      const { data } = await api.privateClient.patch<ReservationResponse>(
        `/owners/my-store/reservations/${reservationId}/reject`,
        body ?? {},
      );
      return data;
    },
  };

  const queries = {
    pendingReservations: () =>
      queryOptions({
        queryKey: keys.pendingReservations(),
        queryFn: async () => (await requests.getPendingReservations()).data,
      }),

    processedReservations: () =>
      queryOptions({
        queryKey: keys.processedReservations(),
        queryFn: async () => (await requests.getProcessedReservations()).data,
      }),
  };

  const mutations = {
    verifyBizAndUpgrade: (queryClient: QueryClient) =>
      createMutationWithCache({
        queryClient,
        mutationKey: [...keys.all, "verify-biz-and-upgrade"],
        mutationFn: requests.verifyBizAndUpgrade,
        getActions: (response) => [
          {
            type: "set",
            queryKey: keys.upgrade(),
            value: response,
          },
          {
            type: "invalidate",
            queryKey: keys.all,
          },
        ],
      }),

    upgradeToStoreManager: (queryClient: QueryClient) =>
      createMutationWithCache({
        queryClient,
        mutationKey: [...keys.all, "upgrade-to-store-manager"],
        mutationFn: requests.upgradeToStoreManager,
        getActions: (response) => [
          {
            type: "set",
            queryKey: keys.upgrade(),
            value: response,
          },
          {
            type: "invalidate",
            queryKey: keys.all,
          },
        ],
      }),

    approveReservation: (queryClient: QueryClient) =>
      createMutationWithCache({
        queryClient,
        mutationKey: [...keys.all, "approve-reservation"],
        mutationFn: requests.approveReservation,
        getActions: () => [
          {
            type: "invalidate",
            queryKey: keys.reservations(),
          },
          {
            type: "invalidate",
            queryKey: keys.pendingReservations(),
          },
          {
            type: "invalidate",
            queryKey: keys.processedReservations(),
          },
        ],
      }),

    rejectReservation: (queryClient: QueryClient) =>
      createMutationWithCache({
        queryClient,
        mutationKey: [...keys.all, "reject-reservation"],
        mutationFn: requests.rejectReservation,
        getActions: () => [
          {
            type: "invalidate",
            queryKey: keys.reservations(),
          },
          {
            type: "invalidate",
            queryKey: keys.pendingReservations(),
          },
          {
            type: "invalidate",
            queryKey: keys.processedReservations(),
          },
        ],
      }),
  };

  const invalidate = {
    reservations: async (queryClient: QueryClient) =>
      invalidatePrefix(queryClient, keys.reservations()),

    pendingReservations: async (queryClient: QueryClient) =>
      invalidatePrefix(queryClient, keys.pendingReservations()),

    processedReservations: async (queryClient: QueryClient) =>
      invalidatePrefix(queryClient, keys.processedReservations()),
  };

  return { keys, requests, queries, mutations, invalidate };
};