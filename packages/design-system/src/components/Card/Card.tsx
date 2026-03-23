"use client";

import { cn } from "../../libs";
import type { CardProps } from "./Card.types";

const variantClasses = {
  /**
   * 1) role-select
   * border: primary
   * radius: 10px
   * bg: background
   * padding: y 2.7rem / x 0
   * shadow: x 2 / y 4 / blur 4 / color #0D98BA 20%
   */
  "role-select":
    "border border-primary bg-background rounded-[10px] px-0 shadow-[2px_4px_4px_0_rgba(13,152,186,0.2)]",

  /**
   * 2) 기본 카드
   * border: primary
   * radius: 10px
   * padding: 1rem
   */
  default:
    "border border-primary rounded-[10px] p-[1rem]",

  /**
   * 3) 기본 카드와 동일, border만 primary-variant
   */
  "primary-variant-bordered":
    "border border-primary-variant rounded-[10px] p-[1rem]",

  /**
   * 4) 기본 카드 + 3번째 사진 shadow
   * x 0 / y 0 / blur 4 / #0D98BA 100%
   */
  "default-blue-shadow":
    "border border-primary rounded-[10px] p-[1rem] shadow-[0_0_4px_0_rgba(13,152,186,1)]",

  /**
   * 5) 기본 카드 + 4번째 사진 shadow
   * x 0 / y 4 / blur 4 / #000000 25%
   */
  "default-black-shadow":
    "border border-primary rounded-[10px] p-[1rem] shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]",

  /**
   * 6) border 없음 / radius 없음 / bg inverse / p 1rem
   */
  "plain-inverse":
    "bg-inverse p-[1rem]",

  /**
   * 7) border gray-200 / radius 10 / px 1rem / py 2rem
   * shadow: 5번째 사진
   * x 0 / y 4 / blur 4 / #000000 20%
   */
  "gray-200-elevated":
    "border border-gray-200 rounded-[10px] px-[1rem] py-[2rem] shadow-[0_4px_4px_0_rgba(0,0,0,0.2)]",

  /**
   * 8) border gray-300 / radius 10 / p 1rem / no shadow
   */
  "gray-300-bordered":
    "border border-gray-300 rounded-[10px] p-[1rem]",

  /**
   * 9) border 없음 / bg inverse / p 1rem
   * shadow: 6번째 사진
   * x 0 / y 0 / blur 10 / #000000 20%
   */
  "inverse-elevated":
    "bg-inverse p-[1rem] rounded-[10px] shadow-[0_0_10px_0_rgba(0,0,0,0.2)]",

  /**
   * 10) 위아래 border만 gray-200 / px 1.6rem / py 1rem
   */
  "section-divider":
    "border-y border-gray-200 px-[1.6rem] py-[1rem]",
} satisfies Record<NonNullable<CardProps["variant"]>, string>;

export const Card = ({
  variant = "default",
  className,
  children,
  ...props
}: CardProps) => {
  return (
    <div
      className={cn(
        "w-full",
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};