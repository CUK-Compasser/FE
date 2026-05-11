"use client";

import { useEffect, useState } from "react";
import { Button, Modal } from "@compasser/design-system";

interface RejectOrderModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (reason: string) => void;
}

export default function RejectOrderModal({
  open,
  onClose,
  onConfirm,
}: RejectOrderModalProps) {
  const [reason, setReason] = useState("");

  const trimmedReason = reason.trim();
  const isValidReason = trimmedReason.length >= 10;

  useEffect(() => {
    if (!open) {
      setReason("");
    }
  }, [open]);

  const handleConfirm = () => {
    if (!isValidReason) return;
    onConfirm(trimmedReason);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      variant="confirm"
      title="주문을 거절하시겠습니까?"
      bodyClassName="mt-0"
      footerClassName="mt-[1.6rem]"
      footer={
        <div className="flex items-center justify-center gap-[2rem]">
          <Button
            size="sm"
            variant="gray"
            fullWidth={false}
            className="px-[2.2rem]"
            onClick={onClose}
          >
            그만두기
          </Button>

          <Button
            size="sm"
            variant="primary"
            fullWidth={false}
            className="px-[2.2rem]"
            onClick={handleConfirm}
            disabled={!isValidReason}
          >
            거절하기
          </Button>
        </div>
      }
    >
      <div className="my-[1.6rem]">
        <input
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="거절 사유를 입력해주세요. (10자 이상)"
          className="
            w-full rounded-[8px] border border-primary
            px-[1rem] py-[0.6rem]
            body2-r text-default
            placeholder:body2-r placeholder:text-gray-300
            outline-none
          "
        />

        {!isValidReason && reason.length > 0 && (
          <p className="caption-m mt-[0.6rem] text-secondary">
            거절 사유는 10자 이상 입력해주세요.
          </p>
        )}
      </div>
    </Modal>
  );
}