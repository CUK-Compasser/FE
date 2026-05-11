"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { StoreRandomBoxRespDTO, StoreRespDTO } from "@compasser/api";
import { useApproveKakaoPayMutation } from "@/shared/queries/mutation/payment/useApproveKakaoPayMutation";
import { useCompleteAdminSettlementMutation } from "@/shared/queries/mutation/admin-settlement/useCompleteAdminSettlementMutation";
import PurchaseCompleteModal from "@/app/(tabs)/main/store/[id]/purchase/_components/PurchaseCompleteModal";

interface PendingPayment {
  reservationId: number;
  store: StoreRespDTO;
  menu: StoreRandomBoxRespDTO;
  pickupTimeText: string;
}

function PaymentSuccessContent() {
  const searchParams = useSearchParams();

  const approveKakaoPayMutation = useApproveKakaoPayMutation();
  const completeAdminSettlementMutation = useCompleteAdminSettlementMutation();

  const hasRequestedRef = useRef(false);

  const [pendingPayment, setPendingPayment] = useState<PendingPayment | null>(
    null,
  );
  const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false);

  const reservationId = useMemo(
    () => Number(searchParams.get("reservationId")),
    [searchParams],
  );

  const pgToken = searchParams.get("pg_token");

  useEffect(() => {
    if (hasRequestedRef.current) return;

    const savedPayment = sessionStorage.getItem("pendingPayment");

    if (!savedPayment || !reservationId || !pgToken) return;

    hasRequestedRef.current = true;

    const parsedPayment = JSON.parse(savedPayment) as PendingPayment;

    setPendingPayment(parsedPayment);

    approveKakaoPayMutation.mutate(
      {
        reservationId,
        pg_token: pgToken,
      },
      {
        onSuccess: () => {
          completeAdminSettlementMutation.mutate(
            {
              storeId: parsedPayment.store.storeId,
              body: {
                reservationIds: [reservationId],
              },
            },
            {
              onSettled: () => {
                sessionStorage.removeItem("pendingPayment");
                setIsCompleteModalOpen(true);
              },
            },
          );
        },
      },
    );
  }, [reservationId, pgToken]);

  if (approveKakaoPayMutation.isPending) {
    return <div>결제 승인 처리 중...</div>;
  }

  if (approveKakaoPayMutation.isError) {
    return <div>결제 승인에 실패했습니다.</div>;
  }

  if (!pendingPayment) {
    return <div>결제 정보를 불러오는 중입니다.</div>;
  }

  return (
    <PurchaseCompleteModal
      isOpen={isCompleteModalOpen}
      store={pendingPayment.store}
      menu={pendingPayment.menu}
      pickupTimeText={pendingPayment.pickupTimeText}
    />
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<div>결제 승인 처리 중...</div>}>
      <PaymentSuccessContent />
    </Suspense>
  );
}