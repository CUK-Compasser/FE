"use client";

import { useEffect, useMemo, useState } from "react";
import { Icon } from "@compasser/design-system";
import { useRewardQrQuery } from "@/shared/queries/query/member/useRewardQrQuery";

interface RewardQrModalProps {
  open: boolean;
  onClose: () => void;
}

export const RewardQrModal = ({ open, onClose }: RewardQrModalProps) => {
  const { data, isLoading, isFetching, dataUpdatedAt } = useRewardQrQuery({
    enabled: open,
  });

  const [secondsLeft, setSecondsLeft] = useState(60);

  const qrImageUrl = useMemo(() => {
    if (!data) return null;
    return URL.createObjectURL(data);
  }, [data]);

  useEffect(() => {
    if (!qrImageUrl) return;

    return () => {
      URL.revokeObjectURL(qrImageUrl);
    };
  }, [qrImageUrl]);

  useEffect(() => {
    if (!open || !dataUpdatedAt) return;

    setSecondsLeft(60);

    const interval = window.setInterval(() => {
      const elapsed = Math.floor((Date.now() - dataUpdatedAt) / 1000);
      const remain = Math.max(60 - elapsed, 0);

      setSecondsLeft(remain);
    }, 1000);

    return () => {
      window.clearInterval(interval);
    };
  }, [open, dataUpdatedAt]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-default/50 px-10"
      onClick={onClose}
    >
      <div
        className="w-full rounded-[20px] bg-white px-[1.6rem] pt-[1.6rem] pb-[4rem]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col items-center text-center">
          <Icon
            name="ProfileCharacter"
            width={80}
            height={80}
            ariaHidden={true}
          />

          <p className="mt-[0.8rem] body1-r text-gray-600">
            사장님께 QR을 보여주세요.
          </p>

          <p className="mt-[2.8rem] head1-sb text-primary">{secondsLeft}초</p>

          <div className="mt-[1rem] flex h-[248px] w-[248px] items-center justify-center">
            {isLoading || isFetching ? (
              <div className="flex h-[248px] w-[248px] items-center justify-center rounded-[12px] border border-gray-200">
                <p className="body2-r text-gray-500">QR 생성 중...</p>
              </div>
            ) : qrImageUrl ? (
              <img
                src={qrImageUrl}
                alt="적립용 QR 코드"
                className="h-[248px] w-[248px]"
              />
            ) : (
              <div className="flex h-[248px] w-[248px] items-center justify-center rounded-[12px] border border-gray-200">
                <p className="body2-r text-gray-500">
                  QR을 불러오지 못했습니다.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};