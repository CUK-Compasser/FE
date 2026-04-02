"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ownerModule } from "@/shared/api/api";

export const useVerifyBusinessMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(
    ownerModule.mutations.verifyBizAndUpgrade(queryClient),
  );
};