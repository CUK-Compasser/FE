import "@/shared/styles/global.css";
import type { ReactNode } from "react";
import Providers from "@/shared/lib/Providers";
import { IconSprite } from "@compasser/design-system";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <body className="w-full flex justify-center bg-gray-500">
        <IconSprite />
        <Providers>
          <div className="app-wrapper">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}