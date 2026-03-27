"use client";

import { Button, Modal } from "@compasser/design-system";

interface AcceptOrderModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function AcceptOrderModal({
  open,
  onClose,
  onConfirm,
}: AcceptOrderModalProps) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      variant="confirm"
      title="주문을 수락하시겠습니까?"
      bodyClassName="mt-0"
      footerClassName="mt-[2rem]"
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
            onClick={onConfirm}
          >
            수락하기
          </Button>
        </div>
      }
    />
  );
}