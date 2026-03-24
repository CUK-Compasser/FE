"use client";

import { useState } from "react";
import { Header } from "@compasser/design-system";
import NoticeItem from "./_components/NoticeItem";
import { INITIAL_NOTICES } from "./_constants/mockNotices";
import { useRouter } from "next/navigation";

export default function Notice() {
  const [notices, setNotices] = useState(INITIAL_NOTICES);
  const router = useRouter();
  
    const handleBack = () => {
      router.back();
    };

  const handleReadNotice = (id: number) => {
    setNotices((prev) =>
      prev.map((notice) =>
        notice.id === id
          ? {
              ...notice,
              isRead: true,
            }
          : notice,
      ),
    );
  };

  return (
    <main className="flex min-h-screen flex-col bg-white">
      <Header
        variant="back-title"
        title="알림"
        onBackClick={handleBack}
      />

      <section className="pt-[1.6rem]">
        <div className="border-t border-gray-200">
          {notices.map((notice) => (
            <NoticeItem
              key={notice.id}
              notice={notice}
              onRead={handleReadNotice}
            />
          ))}
        </div>
      </section>
    </main>
  );
}