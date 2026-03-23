"use client";

import { useRouter } from "next/navigation";
import { Header } from "@compasser/design-system";
import { stampDetails } from "./constants/stampDetails";
import { StampDetailCard } from "./_components/StampDetailCard";

export default function StampDetailPage() {
  const router = useRouter();

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
        <div className="flex flex-col gap-[1.2rem]">
          {stampDetails.map((item) => (
            <StampDetailCard key={item.id} item={item} />
          ))}
        </div>
      </section>
    </main>
  );
}