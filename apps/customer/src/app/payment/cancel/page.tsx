"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCancelKakaoPayMutation } from "@/shared/queries/mutation/payment/useCancelKakaoPayMutation";

export default function PaymentCancelPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const cancelKakaoPayMutation = useCancelKakaoPayMutation();

  useEffect(() => {
    const reservationId = Number(searchParams.get("reservationId"));

    if (!reservationId) return;

    cancelKakaoPayMutation.mutate(reservationId, {
      onSettled: () => {
        sessionStorage.removeItem("pendingPayment");
        router.replace("/main");
      },
    });
  }, [searchParams]);

  return <div>결제가 취소되었습니다.</div>;
}