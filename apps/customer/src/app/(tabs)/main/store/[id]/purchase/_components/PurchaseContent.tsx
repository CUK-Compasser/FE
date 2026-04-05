"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Header } from "@compasser/design-system";
import type { JsonValue, StoreRespDTO, StoreRandomBoxRespDTO } from "@compasser/api";
import PurchaseGuideModal from "./PurchaseGuideModal";
import PurchaseInfoSection from "./PurchaseInfoSection";
import PurchaseNoticeCard from "./PurchaseNoticeCard";
import PurchaseOrderCard from "./PurchaseOrderCard";
import PurchaseCompleteModal from "./PurchaseCompleteModal";

type DayKey = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";
type BusinessHoursValue = Partial<Record<DayKey, string>>;

interface PurchaseContentProps {
  store: StoreRespDTO;
  menu: StoreRandomBoxRespDTO;
}

const ACCOUNT_INFO = {
  bankName: "나무은행",
  accountNumber: "123-4567-891011",
  depositor: "000",
};

const NOTICE_LIST = [
  "결제 정보를 확인하고 이체를 진행해주세요.",
  "10분 이내로 입금을 완료해주세요.",
  "픽업 시간에 맞춰 상품을 수령해주세요.",
];

const DAY_KEYS: DayKey[] = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
const DAY_LABELS: Record<DayKey, string> = {
  mon: "월",
  tue: "화",
  wed: "수",
  thu: "목",
  fri: "금",
  sat: "토",
  sun: "일",
};

function parseBusinessHours(value?: JsonValue): BusinessHoursValue | undefined {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return undefined;
  }

  const record = value as Record<string, unknown>;
  const result: BusinessHoursValue = {};

  const keys: DayKey[] = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

  for (const key of keys) {
    const item = record[key];
    if (typeof item === "string") {
      result[key] = item;
    }
  }

  return result;
}

function getTodayPickupTimeText(businessHours?: BusinessHoursValue): string {
  if (!businessHours) {
    return "운영시간 정보 없음";
  }

  const today = DAY_KEYS[new Date().getDay()];
  const todayValue = businessHours[today];

  if (!todayValue) {
    return "운영시간 정보 없음";
  }

  if (todayValue.toLowerCase() === "closed") {
    return `${DAY_LABELS[today]} 휴무`;
  }

  return `${DAY_LABELS[today]} ${todayValue}`;
}

export default function PurchaseContent({
  store,
  menu,
}: PurchaseContentProps) {
  const router = useRouter();
  const [count, setCount] = useState(1);
  const [isGuideModalOpen, setIsGuideModalOpen] = useState(false);
  const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false);

  const totalPrice = useMemo(() => menu.price * count, [menu.price, count]);

  const pickupTimeText = useMemo(() => {
    const businessHours = parseBusinessHours(store.businessHours);
    return getTodayPickupTimeText(businessHours);
  }, [store.businessHours]);

  const handleDecrease = () => {
    setCount((prev) => Math.max(prev - 1, 0));
  };

  const handleIncrease = () => {
    setCount((prev) => Math.min(prev + 1, menu.stock));
  };

  const handleOpenGuideModal = () => {
    if (count === 0) return;
    setIsGuideModalOpen(true);
  };

  const handleCloseGuideModal = () => {
    setIsGuideModalOpen(false);
  };

  const handleCompleteTransfer = () => {
    setIsGuideModalOpen(false);
    setIsCompleteModalOpen(true);
  };

  const handleCloseCompleteModal = () => {
    setIsCompleteModalOpen(false);
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

            <PurchaseInfoSection
              bankName={ACCOUNT_INFO.bankName}
              accountNumber={ACCOUNT_INFO.accountNumber}
              depositor={ACCOUNT_INFO.depositor}
              totalPrice={totalPrice}
            />

            <PurchaseNoticeCard noticeList={NOTICE_LIST} />

            <Button
              size="lg"
              variant="primary"
              disabled={count === 0}
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
        accountText={`${ACCOUNT_INFO.bankName}${ACCOUNT_INFO.accountNumber}`}
        onClose={handleCloseGuideModal}
        onConfirm={handleCompleteTransfer}
      />

      <PurchaseCompleteModal
        isOpen={isCompleteModalOpen}
        store={store}
        menu={menu}
        pickupTimeText={pickupTimeText}
        onClose={handleCloseCompleteModal}
      />
    </>
  );
}