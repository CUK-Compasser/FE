"use client";

import { AccountCard } from "./_components/AccountCard";
import { ProfileSection } from "./_components/ProfileSection";
import { StatsCard } from "./_components/StatsCard";

export default function MyPage() {
  return (
    <main className="flex flex-col bg-white">
      <ProfileSection />

      <section className="flex-1 bg-white px-[1.75rem] pt-[3.2rem]">
        <div className="flex flex-col gap-[2rem]">
          <AccountCard />
          <StatsCard />
        </div>
      </section>
    </main>
  );
}