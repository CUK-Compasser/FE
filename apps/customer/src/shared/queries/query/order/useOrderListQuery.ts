"use client";

import { useQuery } from "@tanstack/react-query";
import { orderModule } from "@/shared/api/api";
import type { OrderListTab } from "@compasser/api";

export const useOrderListQuery = (tab: OrderListTab) => {
  return useQuery(orderModule.queries.list(tab));
};