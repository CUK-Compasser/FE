"use client";

import { Button, Modal } from "@compasser/design-system";
import { ConfirmActionModalProps } from "../_types/confirmAction";


export const ConfirmActionModal = ({
  open,
  title,
  cancelText,
  confirmText,
  cancelVariant = "gray",
  confirmVariant = "primary",
  onClose,
  onConfirm,
  reverseButtons = false,
}: ConfirmActionModalProps) => {
  const cancelButton = (
    <Button
      size="sm"
      variant={cancelVariant}
      fullWidth={false}
      className="px-[2.2rem]"
      onClick={onClose}
    >
      {cancelText}
    </Button>
  );

  const confirmButton = (
    <Button
      size="sm"
      variant={confirmVariant}
      fullWidth={false}
      className="px-[2.2rem]"
      onClick={onConfirm}
    >
      {confirmText}
    </Button>
  );

  return (
    <Modal
      open={open}
      onClose={onClose}
      variant="confirm"
      title={title}
      bodyClassName="mt-0"
      footerClassName="mt-[2rem]"
      footer={
        <div className="flex items-center justify-center gap-[1.2rem]">
          {reverseButtons ? (
            <>
              {confirmButton}
              {cancelButton}
            </>
          ) : (
            <>
              {cancelButton}
              {confirmButton}
            </>
          )}
        </div>
      }
    />
  );
};