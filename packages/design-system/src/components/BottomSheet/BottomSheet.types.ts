import type { ReactNode } from "react";

export type BottomSheetVariant = "default" | "map";

export interface BottomSheetProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  variant?: BottomSheetVariant;
  closeOnOverlayClick?: boolean;
  showHandle?: boolean;
  overlay?: boolean;
  className?: string;
  overlayClassName?: string;
  contentClassName?: string;
  handleClassName?: string;
}