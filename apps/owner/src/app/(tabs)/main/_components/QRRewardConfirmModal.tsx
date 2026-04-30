"use client";

interface QRRewardConfirmModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isPending?: boolean;
  info: {
    nickname: string;
    email: string;
    randomBoxName: string;
    totalPrice: number;
    stamp: number;
    coupon: number;
  } | null;
}

const MAX_STAMP_COUNT = 10;

const formatPrice = (price: number) => `${price.toLocaleString()}원`;

export default function QRRewardConfirmModal({
  open,
  onClose,
  onConfirm,
  isPending = false,
  info,
}: QRRewardConfirmModalProps) {
  if (!open || !info) return null;

  const currentStamp = Math.max(0, Math.min(info.stamp, MAX_STAMP_COUNT));

  return (
    <div
      className="fixed inset-0 z-[1000] bg-default/50 px-[2.75rem]"
      onClick={onClose}
    >
      <div className="flex h-full items-center justify-center">
        <div
          className="w-full rounded-[10px] border border-primary bg-background px-[1rem] py-[2rem]"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between">
            <div className="flex min-w-0 items-center">
              <p className="shrink-0 head3-m text-default">
                {info.nickname}님
              </p>
              <p className="ml-[0.4rem] min-w-0 truncate body2-m text-gray-600">
                {info.email}
              </p>
            </div>

            <button
              type="button"
              onClick={onConfirm}
              disabled={isPending}
              className="shrink-0 rounded-[999px] border-[1.5px] border-primary px-[2rem] py-[0.8rem] body1-m text-primary disabled:opacity-50"
            >
              {isPending ? "적립 중" : "적립"}
            </button>
          </div>

          <div className="mt-[1rem] grid grid-cols-[max-content_1fr] gap-x-[4.2rem] gap-y-[1rem]">
            <p className="body1-m text-gray-700">주문내역</p>
            <p className="body1-m text-gray-700">{info.randomBoxName}</p>

            <p className="body1-m text-gray-700">가격</p>
            <p className="body1-m text-gray-700">
              {formatPrice(info.totalPrice)}
            </p>

            <p className="body1-m text-gray-700">적립수</p>
            <p className="body1-m text-gray-700">{info.coupon}개</p>

            <p className="body1-m text-gray-700">도장 현황</p>
            <div className="flex items-end">
              <span className="head3-m text-primary">{currentStamp}</span>
              <span className="body2-m text-gray-700">/10</span>
            </div>
          </div>

          <div className="mt-[0.8rem] flex w-full gap-[0.2rem]">
            {Array.from({ length: MAX_STAMP_COUNT }).map((_, index) => (
              <div
                key={index}
                className={`h-[10px] flex-1 rounded-full ${
                  index < currentStamp ? "bg-primary" : "bg-gray-200"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}