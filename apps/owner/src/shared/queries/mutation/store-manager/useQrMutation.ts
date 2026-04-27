"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { storeManagerModule } from "@/shared/api/api";

export const useCheckQrMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(storeManagerModule.mutations.checkingQr(queryClient));
};

export const useWritingRewardMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(storeManagerModule.mutations.writingReward(queryClient));
};