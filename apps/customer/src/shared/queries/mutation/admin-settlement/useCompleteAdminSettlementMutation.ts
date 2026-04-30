"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { adminSettlementModule } from "@/shared/api/api";

export const useCompleteAdminSettlementMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    ...adminSettlementModule.mutations.completeSettlement(queryClient),
  });
};