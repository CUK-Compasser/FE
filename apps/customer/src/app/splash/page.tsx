"use client";

import { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

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
      <Image
        src="/images/logo.svg"
        alt="Compasser logo"
        width={120}
        height={120}
        priority
      />
    </main>
  );
}