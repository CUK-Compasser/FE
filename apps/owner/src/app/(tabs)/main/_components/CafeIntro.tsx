"use client";

import { useState } from "react";
import { Icon } from "@compasser/design-system";
import type { QRCheckResponseDTO } from "@compasser/api";
import QRStampModal from "./QRStampModal";
import QRRewardConfirmModal from "./QRRewardConfirmModal";
import { useWritingRewardMutation } from "@/shared/queries/mutation/store-manager/useQrMutation";

interface CafeIntroProps {
  cafeName?: string | null;
}

const DEFAULT_CAFE_NAME = "등록된 가게";

const formatCafeName = (name?: string | null) => {
  const safeName = name?.trim() || DEFAULT_CAFE_NAME;

  if (safeName.length <= 10) {
    return { firstLine: safeName, secondLine: "" };
  }

  const firstTen = safeName.slice(0, 10);
  const spaceIndexes = [...firstTen]
    .map((char, index) => (char === " " ? index : -1))
    .filter((index) => index !== -1);

  if (spaceIndexes.length >= 2) {
    const breakIndex = spaceIndexes[1];

    return {
      firstLine: safeName.slice(0, breakIndex).trim(),
      secondLine: safeName.slice(breakIndex + 1).trim(),
    };
  }

  return {
    firstLine: safeName.slice(0, 10).trim(),
    secondLine: safeName.slice(10).trim(),
  };
};

export default function CafeIntro({ cafeName }: CafeIntroProps) {
  const { firstLine, secondLine } = formatCafeName(cafeName);

  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [rewardInfo, setRewardInfo] = useState<QRCheckResponseDTO | null>(null);

  const writingRewardMutation = useWritingRewardMutation();

  const handleOpenQrModal = () => {
    setIsQrModalOpen(true);
  };

  const handleCloseQrModal = () => {
    setIsQrModalOpen(false);
  };

  const handleQrSuccess = (data: QRCheckResponseDTO) => {
    setRewardInfo(data);
    setIsQrModalOpen(false);
    setIsConfirmModalOpen(true);
  };

  const handleCloseConfirmModal = () => {
    setIsConfirmModalOpen(false);
    setRewardInfo(null);
  };

  const handleConfirmReward = async () => {
    if (!rewardInfo) return;

    await writingRewardMutation.mutateAsync({
      rewardId: rewardInfo.rewardId,
      storeId: rewardInfo.storeId,
      memberId: rewardInfo.memberId,
    });

    setIsConfirmModalOpen(false);
    setRewardInfo(null);
  };

  return (
    <>
      <section className="flex items-start justify-between">
        <div className="pt-[0.5rem]">
          <p className="head3-m text-gray-700">어서오세요!</p>

          <div className="mt-[0.4rem]">
            <p
              className="head2-m whitespace-pre-line text-primary"
              style={{ textShadow: "0 4px 3px rgba(0, 0, 0, 0.2)" }}
            >
              {firstLine}
              {secondLine ? `\n${secondLine}` : ""}
            </p>
          </div>

          <p className="mt-[0.4rem] head3-m text-gray-700">입니다.</p>
        </div>

        <Icon
          name="Stamp"
          width={100}
          height={100}
          className="shrink-0 cursor-pointer"
          isInteractive
          onClick={handleOpenQrModal}
        />
      </section>

      <QRStampModal
        open={isQrModalOpen}
        onClose={handleCloseQrModal}
        onSuccess={handleQrSuccess}
      />

      <QRRewardConfirmModal
        open={isConfirmModalOpen}
        onClose={handleCloseConfirmModal}
        onConfirm={handleConfirmReward}
        isPending={writingRewardMutation.isPending}
        info={
          rewardInfo
            ? {
                nickname: rewardInfo.nickname,
                email: rewardInfo.email,
                randomBoxName: rewardInfo.randomBoxName,
                totalPrice: rewardInfo.totalPrice,
                stamp: rewardInfo.stamp,
                coupon: rewardInfo.coupon,
              }
            : null
        }
      />
    </>
  );
}