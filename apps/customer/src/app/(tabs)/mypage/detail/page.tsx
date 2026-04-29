"use client";

import { useRouter } from "next/navigation";
import { Header } from "@compasser/design-system";
import { StampDetailCard } from "./_components/StampDetailCard";
import { useRewardListQuery } from "@/shared/queries/query/member/useRewardListQuery";

export default function StampDetailPage() {
  const router = useRouter();
  const { data: rewards = [], isLoading, isError } = useRewardListQuery();

  const handleBack = () => {
    router.back();
  };

  return (
    <main className="flex min-h-screen flex-col bg-white">
      <Header
        variant="back-title"
        title="적립 상세"
        onBackClick={handleBack}
      />

      <section className="flex-1 px-[1.6rem] pt-[2.4rem]">
        {isLoading ? (
          <p className="body1-m text-gray-600">적립 정보를 불러오는 중입니다.</p>
        ) : isError ? (
          <p className="body1-m text-gray-600">
            적립 정보를 불러오지 못했습니다.
          </p>
        ) : rewards.length === 0 ? (
          <p className="body1-m text-gray-600">적립 내역이 없습니다.</p>
        ) : (
          <div className="flex flex-col gap-[1.2rem]">
            {rewards.map((item) => (
              <StampDetailCard key={item.storeName} item={item} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}