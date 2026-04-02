"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authModule } from "@/shared/api/api";

export const useSignupMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(authModule.mutations.signUp(queryClient));
};