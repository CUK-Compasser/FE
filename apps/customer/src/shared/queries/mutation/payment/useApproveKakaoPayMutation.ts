import { useMutation } from "@tanstack/react-query";
import { paymentModule } from "@/shared/api/api";

interface ApproveKakaoPayParams {
  reservationId: number;
  pg_token: string;
}

export const useApproveKakaoPayMutation = () => {
  return useMutation({
    mutationFn: ({ reservationId, pg_token }: ApproveKakaoPayParams) =>
      paymentModule.requests.approveKakaoPay({
        reservationId,
        pg_token,
      }),
  });
};