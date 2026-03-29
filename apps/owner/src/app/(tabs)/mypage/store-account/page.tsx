"use client";

import { useRouter } from "next/navigation";
import { Header } from "@compasser/design-system";
import { OwnerAccountCard } from "./_components/OwnerAccountCard";
import { OwnerBusinessNumberCard } from "./_components/OwnerBusinessNumberCard";
import { OwnerProfileSection } from "./_components/OwnerProfileSection";
import { OwnerStoreAccountInfoCard } from "./_components/OwnerStoreAccountInfoCard";

export default function StoreAccountPage() {
  const router = useRouter();

  return (
    <main className="flex min-h-dvh flex-col bg-white">
      <Header
        variant="back-title"
        title="내 스토어 계정"
        onBackClick={() => router.back()}
      />

      <OwnerProfileSection />

      <section className="flex-1 bg-white px-[1.75rem] pt-[3.2rem] pb-[3.2rem]">
        <div className="flex flex-col gap-[2rem]">
          <OwnerAccountCard />
          <OwnerStoreAccountInfoCard />
          <OwnerBusinessNumberCard />
        </div>
      </section>
    </main>
  );
}