"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { randomBoxModule } from "@/shared/api/api";

export const useCreateRandomBoxMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(randomBoxModule.mutations.create(queryClient));
};