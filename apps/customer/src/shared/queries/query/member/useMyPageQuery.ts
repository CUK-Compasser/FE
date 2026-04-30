"use client";

import { useQuery } from "@tanstack/react-query";
import { memberModule } from "@/shared/api/api";

export const useMyPageQuery = () => {
  return useQuery(memberModule.queries.myPage());
};