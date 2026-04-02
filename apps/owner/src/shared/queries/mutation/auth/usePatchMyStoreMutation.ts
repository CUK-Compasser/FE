"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { storeModule } from "@/shared/api/api";

export const usePatchMyStoreMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(storeModule.mutations.patchMyStore(queryClient));
};