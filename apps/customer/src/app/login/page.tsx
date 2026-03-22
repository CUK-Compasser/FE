"use client";

import { useRouter } from "next/navigation";
import { Input, Button, Icon } from "@compasser/design-system";

export default function LoginPage() {
  const router = useRouter();

  const handleMoveRoleSelect = () => {
    router.push("/role-select");
  };

  const handleLogin = () => {
    console.log("일반 로그인");
  };

  const handleKakaoLogin = () => {
    console.log("카카오 로그인");
  };

  return (
    <main className="flex min-h-screen w-full items-center justify-center px-[1.6rem]">
      <section className="w-full">
        <div className="flex flex-col">
          <div className="w-full">
            <p className="body2-m pb-[0.2rem] text-default">이메일</p>
            <Input type="email" placeholder="이메일을 입력해주세요" />
          </div>

          <div className="mt-[2rem] mb-[5.2rem] w-full">
            <p className="body2-m pb-[0.2rem] text-default">비밀번호</p>
            <Input type="password" placeholder="비밀번호를 입력해주세요" />
          </div>

          <div className="w-full">
            <Button
              type="button"
              size="lg"
              kind="default"
              variant="primary"
              onClick={handleLogin}
            >
              일반 로그인
            </Button>
          </div>

          <div className="mt-[1.2rem] w-full">
            <button
              type="button"
              onClick={handleKakaoLogin}
              aria-label="카카오 로그인"
              className="relative flex w-full items-center justify-center rounded-[8px] bg-[#FEE500] px-[1.2rem] py-[1rem]"
            >
              <div className="absolute left-[1.4rem] top-1/2 -translate-y-1/2">
                <Icon
                  name="KakaoLogo"
                  width={23}
                  height={23}
                  ariaHidden={true}
                />
              </div>

              <span className="head3-m text-[#191919]">카카오 로그인</span>
            </button>
          </div>

          <div className="mt-[1.6rem] flex justify-center">
            <button
              type="button"
              onClick={handleMoveRoleSelect}
              className="body1-m text-gray-700 underline underline-offset-[0.2rem]"
            >
              회원가입
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}