import { useQuery } from "@tanstack/react-query";
import { ownerModule } from "@/shared/api/api";

export const useProcessedReservationsQuery = () => {
  return useQuery(ownerModule.queries.processedReservations());
};