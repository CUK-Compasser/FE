"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { storeImageModule } from "@/shared/api/api";

export const useRemoveStoreImageMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(storeImageModule.mutations.remove(queryClient));
};