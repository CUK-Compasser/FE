import { cn } from "../../libs";
import type { ModalProps, ModalVariant } from "./Modal.types";

const MODAL_VARIANT_CLASSES: Record<ModalVariant, string> = {
  confirm:
    "w-[80%] px-[3.6rem] py-[2.8rem] shadow-[2px_4px_4px_rgba(0,0,0,0.15)]",
  default:
    "w-[90%] p-[1rem] shadow-[0_4px_4px_rgba(13,152,186,0.2)]",
  payment:
    "w-[90%] px-[2.8rem] py-[1.8rem] shadow-[0_4px_4px_rgba(13,152,186,0.2)]",
  reject:
    "w-[85%] px-[3.6rem] py-[2rem] shadow-[0_4px_4px_rgba(13,152,186,0.2)]",
  action:
    "w-[90%] px-[1rem] py-[2rem] shadow-[0_4px_4px_rgba(13,152,186,0.2)]",
};

export const Modal = ({
  open,
  onClose,
  variant = "default",
  closeOnOverlayClick = true,
  title,
  children,
  footer,
  className,
  titleClassName,
  bodyClassName,
  footerClassName,
  overlayClassName,
}: ModalProps) => {
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
        "fixed inset-0 z-50 flex items-center justify-center bg-black/50",
        overlayClassName
      )}
      onClick={handleOverlayClick}
    >
      <div
        role="dialog"
        aria-modal="true"
        className={cn(
          "rounded-[10px] border border-primary bg-inverse",
          MODAL_VARIANT_CLASSES[variant],
          className
        )}
        onClick={(event) => event.stopPropagation()}
      >
        {title && (
          <div className={cn("head3-m text-default text-center", titleClassName)}>
            {title}
          </div>
        )}

        {children && (
          <div
            className={cn(
              title && "mt-[1.6rem]",
              bodyClassName
            )}
          >
            {children}
          </div>
        )}

        {footer && (
          <div
            className={cn(
              "mt-[2rem]",
              footerClassName
            )}
          >
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};