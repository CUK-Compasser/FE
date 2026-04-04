"use client";

import { useQuery } from "@tanstack/react-query";
import { storeModule } from "@/shared/api/api";

export const useMyStoreQuery = () => {
  return useQuery(storeModule.queries.myStore());
};