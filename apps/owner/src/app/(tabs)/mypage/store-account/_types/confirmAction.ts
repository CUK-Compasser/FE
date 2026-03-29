export interface ConfirmActionModalProps {
  open: boolean;
  title: string;
  cancelText: string;
  confirmText: string;
  cancelVariant?: "gray" | "primary" | "secondary";
  confirmVariant?: "gray" | "primary" | "secondary";
  onClose: () => void;
  onConfirm: () => void;
  reverseButtons?: boolean;
}