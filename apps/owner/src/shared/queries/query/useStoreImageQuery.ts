"use client";

import { useQuery } from "@tanstack/react-query";
import { storeImageModule } from "@/shared/api/api";

export const useStoreImageQuery = () => {
  return useQuery(storeImageModule.queries.get());
};