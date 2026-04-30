"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCancelKakaoPayMutation } from "@/shared/queries/mutation/payment/useCancelKakaoPayMutation";

function PaymentCancelContent() {
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
  }, [searchParams, cancelKakaoPayMutation, router]);

  return <div>결제가 취소되었습니다.</div>;
}

export default function PaymentCancelPage() {
  return (
    <Suspense fallback={<div>결제 취소 처리 중...</div>}>
      <PaymentCancelContent />
    </Suspense>
  );
}