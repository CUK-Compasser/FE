import { useMutation } from "@tanstack/react-query";
import { paymentModule } from "@/shared/api/api";

export const useCancelKakaoPayMutation = () => {
  return useMutation({
    mutationFn: (reservationId: number) =>
      paymentModule.requests.cancelKakaoPay({ reservationId }),
  });
};