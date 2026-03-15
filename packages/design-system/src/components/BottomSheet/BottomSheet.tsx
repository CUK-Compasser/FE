import { cn } from "../../libs";
import type { BottomSheetProps, BottomSheetVariant } from "./BottomSheet.types";

const BOTTOM_SHEET_VARIANT_CLASSES: Record<BottomSheetVariant, string> = {
  default: "rounded-t-[2rem] bg-inverse",
  map: "rounded-t-[2rem] bg-inverse",
};

export const BottomSheet = ({
  open,
  onClose,
  children,
  variant = "default",
  closeOnOverlayClick = true,
  showHandle = true,
  overlay = true,
  className,
  overlayClassName,
  contentClassName,
  handleClassName,
}: BottomSheetProps) => {
  if (!open) {
    return null;
  }

  const handleOverlayClick = () => {
    if (!closeOnOverlayClick) {
      return;
    }

    onClose();
  };

  return (
    <div
      className={cn(
        "fixed inset-0 z-9999 flex items-end justify-center",
        overlay ? "bg-black/50" : "bg-transparent",
        overlayClassName
      )}
      onClick={handleOverlayClick}
    >
      <div
        role="dialog"
        aria-modal="true"
        className={cn(
          "w-full border-x border-t border-primary shadow-[0_-4px_4px_rgba(0,0,0,0.1)]",
          BOTTOM_SHEET_VARIANT_CLASSES[variant],
          className
        )}
        onClick={(event) => event.stopPropagation()}
      >
        <div
          className={cn(
            "px-[1rem] pt-[0.8rem] pb-[2rem]",
            contentClassName
          )}
        >
          {showHandle && (
            <div
              className={cn(
                "flex w-full justify-center py-[0.8rem]",
                handleClassName
              )}
            >
              <div className="h-[0.3rem] w-[7rem] rounded-full bg-gray-300" />
            </div>
          )}

          {children}
        </div>
      </div>
    </div>
  );
};