import { type ClassValue, clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: [
        "head1-sb",
        "head2-sb",
        "head2-m",
        "head3-m",
        "body1-sb",
        "body1-m",
        "body1-r",
        "body2-m",
        "body2-r",
        "caption1-r",
        "caption2-r",
      ],
      color: [
        "primary",
        "primary-variant",
        "primary-button",
        "secondary",
        "accent",
        "default",
        "inverse",
        "gray-100",
        "gray-200",
        "gray-300",
        "gray-400",
        "gray-500",
        "gray-600",
        "gray-700",
        "gray-800",
      ],
      shadow: ["common-shadow"],
    },
  },
});

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};