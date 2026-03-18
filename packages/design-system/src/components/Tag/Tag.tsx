import { cn } from "../../libs";
import type { TagProps } from "./Tag.types";

const variantClassMap = {
  pill: {
    base: "rounded-full border border-primary px-[1rem] py-[0.6rem] text-primary",
    selected: "bg-primary text-inverse border-primary",
    unselected: "bg-transparent text-primary",
  },
  "pill-wide": {
    base: "rounded-full border border-primary px-[1.6rem] py-[0.6rem] text-primary",
    selected: "bg-primary text-inverse border-primary",
    unselected: "bg-transparent text-primary",
  },
  "pill-static": {
    base: "rounded-full border border-primary px-[1rem] py-[0.6rem] text-primary bg-transparent",
    selected: "text-primary bg-transparent border-primary",
    unselected: "text-primary bg-transparent border-primary",
  },
  "rounded-rect": {
    base: "rounded-[10px] border border-primary px-[2rem] py-[0.8rem] text-primary bg-transparent",
    selected: "text-primary bg-transparent border-primary",
    unselected: "text-primary bg-transparent border-primary",
  },
} as const;

export const Tag = ({
  children,
  variant = "pill",
  selected = false,
  changeOnClick = true,
  className,
  type = "button",
  disabled = false,
  ...props
}: TagProps) => {
  const styles = variantClassMap[variant];

  const isSelectableVariant = variant === "pill" || variant === "pill-wide";
  const shouldApplySelectedStyle =
    isSelectableVariant && changeOnClick && selected;

  return (
    <button
      type={type}
      disabled={disabled}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap text-sm font-medium leading-none transition-colors",
        "disabled:cursor-not-allowed disabled:opacity-50",
        styles.base,
        shouldApplySelectedStyle ? styles.selected : styles.unselected,
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};