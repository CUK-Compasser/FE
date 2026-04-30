import { useMutation } from "@tanstack/react-query";
import { paymentModule } from "@/shared/api/api";

export const useReadyKakaoPayMutation = () => {
  return useMutation({
    mutationFn: (reservationId: number) =>
      paymentModule.requests.readyKakaoPay({ reservationId }),
  });
};