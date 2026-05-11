import { useQuery } from "@tanstack/react-query";
import { ownerModule } from "@/shared/api/api";

export const usePendingReservationsQuery = () => {
  return useQuery(ownerModule.queries.pendingReservations());
};