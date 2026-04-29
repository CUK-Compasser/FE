"use client";

import { useQuery } from "@tanstack/react-query";
import { memberModule } from "@/shared/api/api";

export const useRewardListQuery = () => {
  return useQuery(memberModule.queries.rewards());
};