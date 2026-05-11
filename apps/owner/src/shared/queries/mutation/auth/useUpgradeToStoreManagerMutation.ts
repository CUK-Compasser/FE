"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ownerModule } from "@/shared/api/api";

export const useUpgradeToStoreManagerMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    ...ownerModule.mutations.upgradeToStoreManager(queryClient),
  });
};