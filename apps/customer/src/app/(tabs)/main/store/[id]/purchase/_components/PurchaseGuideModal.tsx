"use client";

import { Button, Icon } from "@compasser/design-system";

interface PurchaseGuideModalProps {
  isOpen: boolean;
  accountText: string;
  onClose: () => void;
  onConfirm: () => void;
}

export default function PurchaseGuideModal({
  isOpen,
  accountText,
  onClose,
  onConfirm,
}: PurchaseGuideModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center bg-default/50 px-[1.6rem]">
      <div className="h-[26.5rem] w-full rounded-[10px] border border-primary bg-inverse px-[1.6rem] py-[1rem]">
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onClose}
            aria-label="닫기"
            className="flex h-[3.6rem] w-[3.6rem] items-center justify-center text-gray-600"
          >
            <Icon
              name="CloseButton"
              width={36}
              height={36}
              ariaHidden={false}
            />
          </button>
        </div>

        <div className="mt-[0.4rem] flex flex-col items-center px-[1.2rem] pb-[0.8rem]">
          <div className="flex items-center justify-center">
            <Icon
              name="KakaoPay"
              width={67.76}
              height={28}
              ariaHidden={false}
            />
            <h3 className="ml-[0.4rem] head3-m text-default">
              카카오 계좌이체 안내
            </h3>
          </div>

          <div className="mt-[2rem] text-center">
            <p className="body2-r text-default">
              카카오 계좌이체로 결제가 진행됩니다.
            </p>
            <p className="body2-r text-default">
              아래의 계좌로 계좌이체를 진행해주세요.
            </p>
          </div>

          <p className="mt-[1.2rem] head3-m text-default">{accountText}</p>

          <Button
            size="lg"
            variant="primary"
            className="mt-[2rem]"
            onClick={onConfirm}
          >
            결제하기
          </Button>
        </div>
      </div>
    </div>
  );
}