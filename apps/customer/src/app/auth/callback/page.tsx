"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function KakaoCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const accessToken = searchParams.get("accessToken");
    const refreshToken = searchParams.get("refreshToken");

    if (accessToken) {
      localStorage.setItem("accessToken", accessToken);
    }

    if (refreshToken) {
      localStorage.setItem("refreshToken", refreshToken);
    }

    router.replace("/role-select");
  }, [router, searchParams]);

  return <div>카카오 로그인 처리 중...</div>;
}

export default function KakaoCallbackPage() {
  return (
    <Suspense fallback={<div>카카오 로그인 처리 중...</div>}>
      <KakaoCallbackContent />
    </Suspense>
  );
}