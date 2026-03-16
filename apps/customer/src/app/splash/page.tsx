"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "@compasser/design-system";

export default function SplashPage() {
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.replace("/login");
    }, 1500);

    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-white">
      <Icon name="LogoText" width={332} height={158} ariaHidden={false} />
    </main>
  );
}