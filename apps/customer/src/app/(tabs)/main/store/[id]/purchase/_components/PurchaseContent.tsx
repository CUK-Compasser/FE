"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Header } from "@compasser/design-system";
import type {
  StoreRandomBoxRespDTO,
  StoreRespDTO,
} from "@compasser/api";
import { useCreateOrderMutation } from "@/shared/queries/mutation/order/useCreateOrderMutation";
import { useReadyKakaoPayMutation } from "@/shared/queries/mutation/payment/useReadyKakaoPayMutation";
import PurchaseGuideModal from "./PurchaseGuideModal";
import PurchaseNoticeCard from "./PurchaseNoticeCard";
import PurchaseOrderCard from "./PurchaseOrderCard";

interface PurchaseContentProps {
  store: StoreRespDTO;
  menu: StoreRandomBoxRespDTO;
}

interface PickupTimeValue {
  timezone?: string;
  pickupTime?: {
    start?: string;
    end?: string;
  };
}

const NOTICE_LIST = [
  "결제 정보를 확인하고 결제를 진행해주세요.",
  "결제 완료 후 주문이 확정됩니다.",
  "픽업 시간에 맞춰 상품을 수령해주세요.",
];

function getPickupTimeText(pickupTime?: string): string {
  if (!pickupTime) {
    return "픽업시간 정보 없음";
  }

  try {
    const parsed = JSON.parse(pickupTime) as PickupTimeValue;

    const start = parsed.pickupTime?.start;
    const end = parsed.pickupTime?.end;

    if (!start || !end) {
      return "픽업시간 정보 없음";
    }

    return `${start} ~ ${end}`;
  } catch {
    return "픽업시간 정보 없음";
  }
}

export default function PurchaseContent({
  store,
  menu,
}: PurchaseContentProps) {
  const router = useRouter();
  const [count, setCount] = useState(1);
  const [isGuideModalOpen, setIsGuideModalOpen] = useState(false);

  const createOrderMutation = useCreateOrderMutation();
  const readyKakaoPayMutation = useReadyKakaoPayMutation();

  const isPaymentPending =
    createOrderMutation.isPending || readyKakaoPayMutation.isPending;

  const totalPrice = useMemo(() => menu.price * count, [menu.price, count]);

  const pickupTimeText = useMemo(() => {
    return getPickupTimeText(menu.pickupTimeInfo);
  }, [menu.pickupTimeInfo]);

  const handleDecrease = () => {
    setCount((prev) => Math.max(prev - 1, 0));
  };

  const handleIncrease = () => {
    setCount((prev) => Math.min(prev + 1, menu.stock));
  };

  const handleOpenGuideModal = () => {
    if (count === 0 || isPaymentPending) return;
    setIsGuideModalOpen(true);
  };

  const handleCloseGuideModal = () => {
    if (isPaymentPending) return;
    setIsGuideModalOpen(false);
  };

  const handleCompleteTransfer = async () => {
    if (count === 0 || isPaymentPending) return;

    const orderResponse = await createOrderMutation.mutateAsync({
      randomBoxId: menu.boxId,
      quantity: count,
    });

    const reservationId = orderResponse.data.reservationId;

    sessionStorage.setItem(
      "pendingPayment",
      JSON.stringify({
        reservationId,
        store,
        menu,
        pickupTimeText,
      }),
    );

    const readyResponse =
      await readyKakaoPayMutation.mutateAsync(reservationId);

    window.location.href = readyResponse.data.redirectUrl;
  };

  return (
    <>
      <div className="flex min-h-screen w-full flex-col">
        <Header
          variant="back-title"
          title="랜덤박스 구매"
          onBackClick={() => router.back()}
        />

        <main className="flex-1 overflow-y-auto bg-background">
          <div className="px-[1.6rem] pb-[1.6rem] pt-[1.6rem]">
            <PurchaseOrderCard
              store={store}
              menu={menu}
              pickupTimeText={pickupTimeText}
              count={count}
              totalPrice={totalPrice}
              onDecrease={handleDecrease}
              onIncrease={handleIncrease}
            />

            <PurchaseNoticeCard noticeList={NOTICE_LIST} />

            <Button
              size="lg"
              variant="primary"
              disabled={count === 0 || isPaymentPending}
              className="mb-[4.8rem] mt-[1.6rem]"
              onClick={handleOpenGuideModal}
            >
              결제하기
            </Button>
          </div>
        </main>
      </div>

      <PurchaseGuideModal
        isOpen={isGuideModalOpen}
        accountText={`${totalPrice.toLocaleString()}원`}
        onClose={handleCloseGuideModal}
        onConfirm={handleCompleteTransfer}
      />
    </>
  );
}