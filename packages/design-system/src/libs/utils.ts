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
        /* Background Colors */
        "bg-primary",
        "bg-primary-button",
        "bg-secondary",
        "bg-accent",

        "bg-gray-100",
        "bg-gray-200",
        "bg-gray-300",
        "bg-gray-400",
        "bg-gray-500",
        "bg-gray-600",
        "bg-gray-700",
        "bg-gray-800",

        /* Text Colors */
        "text-default",
        "text-on-primary",
        "text-on-secondary",
        "text-inverse",
        "text-gray-100",
        "text-gray-200",
        "text-gray-300",
        "text-gray-400",
        "text-gray-500",
        "text-gray-600",
        "text-gray-700",
        "text-gray-800",
      ],


      /* Shadow*/
      shadow: ["common-shadow"],
    },
  },
});

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};
