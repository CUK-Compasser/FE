import type { QueryClient } from "@tanstack/react-query";

export const invalidatePrefix = async (
  queryClient: QueryClient,
  queryKey: readonly unknown[],
) => {
  await queryClient.invalidateQueries({ queryKey });
};