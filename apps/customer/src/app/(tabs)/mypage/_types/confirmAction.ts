export interface ConfirmActionModalProps {
  open: boolean;
  title: string;
  cancelText: string;
  confirmText: string;
  cancelVariant?: "gray" | "outline-gray";
  confirmVariant?: "primary" | "secondary";
  onClose: () => void;
  onConfirm: () => void;
  reverseButtons?: boolean;
}