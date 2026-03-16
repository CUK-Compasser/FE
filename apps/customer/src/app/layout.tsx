import "@compasser/design-system/style.css";
import type { ReactNode } from "react";
import Providers from "@/shared/lib/Providers";
import { IconSprite } from "@compasser/design-system";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <body className="w-full flex justify-center bg-gray-50">
        <IconSprite />
        <Providers>
          <div className="w-full sm:max-w-[393px] min-h-screen bg-white flex flex-col px-6 outline outline-[0.5px] outline-[#E0E0E0]">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}