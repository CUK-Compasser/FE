import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ownerModule } from "@/shared/api/api";

export const useRejectReservationMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(ownerModule.mutations.rejectReservation(queryClient));
};