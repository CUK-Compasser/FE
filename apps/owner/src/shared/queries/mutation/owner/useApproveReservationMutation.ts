import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ownerModule } from "@/shared/api/api";

export const useApproveReservationMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(ownerModule.mutations.approveReservation(queryClient));
};