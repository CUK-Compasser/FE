import { useMutation } from "@tanstack/react-query";
import type { CreateOrderDTO } from "@compasser/api";
import { orderModule } from "@/shared/api/api";

export const useCreateOrderMutation = () => {
  return useMutation({
    mutationFn: (body: CreateOrderDTO) =>
      orderModule.requests.createOrder(body),
  });
};