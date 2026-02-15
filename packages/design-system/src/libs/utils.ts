import { type ClassValue, clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      /* Typography*/
      text: [
        "head1",
        "head2",
        "head3",
        "sub1-sb",
        "sub2-sb",
        "body1-sb",
        "body1-m",
        "body1-r",
        "body2-m",
        "body2-r",
        "caption1-sb",
        "caption2-m",
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

        "text-gray-500",
        "text-gray-700",
      ],


      /* Shadow*/
      shadow: ["common-shadow"],
    },
  },
});

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
}
