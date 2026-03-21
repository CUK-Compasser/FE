"use client";

import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const handleMoveRoleSelect = () => {
    router.push("/role-select");
  };

  return (
    <main className="flex min-h-screen items-center justify-center px-[1.6rem]">
      <button
        type="button"
        onClick={handleMoveRoleSelect}
        className="rounded-[10px] border border-primary px-[1.6rem] py-[1rem] text-primary"
      >
        역할 선택 페이지로 이동
      </button>
    </main>
  );
}