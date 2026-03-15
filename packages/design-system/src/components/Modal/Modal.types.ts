import type { ReactNode } from "react";

export type ModalVariant =
  | "confirm"
  | "default"
  | "payment"
  | "reject"
  | "action";

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  variant?: ModalVariant;
  closeOnOverlayClick?: boolean;
  title?: ReactNode;
  children?: ReactNode;
  footer?: ReactNode;
  className?: string;
  titleClassName?: string;
  bodyClassName?: string;
  footerClassName?: string;
  overlayClassName?: string;
}