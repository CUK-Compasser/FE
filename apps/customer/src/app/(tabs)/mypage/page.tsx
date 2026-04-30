"use client";

import { AccountCard } from "./_components/AccountCard";
import { ProfileSection } from "./_components/ProfileSection";
import { StatsCard } from "./_components/StatsCard";
import { useMyPageQuery } from "@/shared/queries/query/member/useMyPageQuery";

export default function MyPage() {
  const { data, isLoading, isError } = useMyPageQuery();

  if (isLoading) {
    return (
      <main className="flex flex-col bg-white">
        <ProfileSection isLoading={true} />
        <section className="flex-1 bg-white px-[1.75rem] pt-[3.2rem]">
          <div className="flex flex-col gap-[2rem]">
            <AccountCard />
            <StatsCard isLoading={true} />
          </div>
        </section>
      </main>
    );
  }

  if (isError || !data) {
    return (
      <main className="flex flex-col bg-white">
        <section className="px-[1.6rem] pt-[4.2rem] pb-[3.2rem]">
          <p className="body1-m text-default">
            마이페이지 정보를 불러오지 못했습니다.
          </p>
        </section>
      </main>
    );
  }

  return (
    <main className="flex flex-col bg-white">
      <ProfileSection
        memberName={data.memberName}
        nickname={data.nickname}
        email={data.email}
        isLoading={isLoading}
      />

      <section className="flex-1 bg-white px-[1.75rem] pt-[3.2rem]">
        <div className="flex flex-col gap-[2rem]">
          <AccountCard />
          <StatsCard
            totalStampCount={data.totalStampCount}
            totalUnboxingCount={data.totalUnboxingCount}
            totalCouponCount={data.totalCouponCount}
          />
        </div>
      </section>
    </main>
  );
}