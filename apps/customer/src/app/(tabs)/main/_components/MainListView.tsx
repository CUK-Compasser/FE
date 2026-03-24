"use client";

import { useRouter } from "next/navigation";
import { Header } from "@compasser/design-system";

export default function MainListView() {
  const router = useRouter();

  const handleMoveNotice = () => {
    router.push("/notice");
  };

  return (
    <div className="flex flex-col bg-inverse">
      <Header
        variant="location-search"
        value=""
        placeholder="내 주소를 설정해주세요"
        inputReadOnly
        onAlarmClick={handleMoveNotice}
      />

      <section className="px-[1.6rem] pt-[2rem]">
        <div className="text-[2rem] font-semibold">Main List View</div>
      </section>
    </div>
  );
}