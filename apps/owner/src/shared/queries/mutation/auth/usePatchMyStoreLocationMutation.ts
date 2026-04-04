"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { storeModule } from "@/shared/api/api";

export const usePatchMyStoreLocationMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(storeModule.mutations.patchMyStoreLocation(queryClient));
};