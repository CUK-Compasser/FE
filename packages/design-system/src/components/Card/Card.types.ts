import type { HTMLAttributes, ReactNode } from "react";

export type CardVariant =
  | "role-select"
  | "default"
  | "primary-variant-bordered"
  | "default-blue-shadow"
  | "default-black-shadow"
  | "plain-inverse"
  | "gray-200-elevated"
  | "gray-300-bordered"
  | "inverse-elevated"
  | "section-divider";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  children: ReactNode;
}