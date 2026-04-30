import { useMutation } from "@tanstack/react-query";
import { orderModule } from "@/shared/api/api";

export const useCancelOrderMutation = () => {
  return useMutation({
    mutationFn: (orderId: number) =>
      orderModule.requests.cancelOrder(orderId),
  });
};