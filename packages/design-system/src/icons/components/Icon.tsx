import * as React from "react";
import clsx from "clsx";
import type { IconName } from "../generated/iconNames";

type IconRotate = 90 | 180 | 270;

type IconColor =
  | "primary"
  | "primary-variant"
  | "primary-button"
  | "secondary"
  | "accent"
  | "default"
  | "inverse"
  | "gray-100"
  | "gray-200"
  | "gray-300"
  | "gray-400"
  | "gray-500"
  | "gray-600"
  | "gray-700"
  | "gray-800";

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: IconName;
  isInteractive?: boolean;
  pressed?: boolean;
  size?: number | string;
  width?: number | string;
  height?: number | string;
  color?: IconColor;
  className?: string;
  rotate?: IconRotate;
  hasRotateAnimation?: boolean;
  ariaHidden?: boolean;
}

export const Icon = ({
  name,
  isInteractive = false,
  pressed,
  size,
  width,
  height,
  color,
  className,
  rotate,
  hasRotateAnimation = false,
  ariaHidden = true,
  style,
  onClick,
  onKeyDown,
  ...rest
}: IconProps) => {
  const w = width ?? size ?? 20;
  const h = height ?? size ?? 20;

  const handleKeyDown = (e: React.KeyboardEvent<SVGSVGElement>) => {
    if (isInteractive && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      onClick?.(e as unknown as React.MouseEvent<SVGSVGElement, MouseEvent>);
    }
    onKeyDown?.(e);
  };

  const rotateClass =
    rotate === 90
      ? "rotate-90"
      : rotate === 180
        ? "rotate-180"
        : rotate === 270
          ? "rotate-[270deg]"
          : "";

  const combinedClassName = clsx(
    "inline-block shrink-0",
    "transform",
    rotateClass,
    hasRotateAnimation && "transition-transform duration-200",
    className,
  );

  const iconStyle: React.CSSProperties = {
    ...style,
    ...(color ? { color: `var(--color-${color})` } : {}),
  };

  return (
    <svg
      width={typeof w === "number" ? `${w}px` : w}
      height={typeof h === "number" ? `${h}px` : h}
      className={combinedClassName}
      style={iconStyle}
      role={isInteractive ? "button" : undefined}
      tabIndex={isInteractive ? 0 : undefined}
      aria-pressed={isInteractive ? pressed : undefined}
      aria-hidden={ariaHidden}
      onClick={isInteractive ? onClick : undefined}
      onKeyDown={isInteractive ? handleKeyDown : undefined}
      {...rest}
    >
      <use href={`#icon-${name}`} />
    </svg>
  );
};