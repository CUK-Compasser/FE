"use client";

import { useQuery } from "@tanstack/react-query";
import { orderModule } from "@/shared/api/api";

export const useOrderListQuery = () => {
  return useQuery(orderModule.queries.list());
};