"use client";

import { Input, Button } from "@compasser/design-system";

export default function SignupPage() {
  const handleSignup = () => {
    console.log("회원가입");
  };

  return (
    <main className="flex h-screen w-full flex-col bg-white">
      <section className="min-h-0 flex-1 overflow-y-auto px-[1.6rem]">
        <div className="pt-[3.6rem]">
          <div className="w-full">
            <p className="body2-m pb-[0.2rem] text-default">이름</p>
            <Input type="text" placeholder="이름을 입력해주세요" />
          </div>

          <div className="mt-[3.6rem] w-full">
            <p className="body2-m pb-[0.2rem] text-default">닉네임</p>
            <Input type="text" placeholder="닉네임을 입력해주세요" />
          </div>

          <div className="mt-[3.6rem] w-full">
            <p className="body2-m pb-[0.2rem] text-default">이메일</p>
            <Input type="email" placeholder="이메일을 입력해주세요" />
          </div>

          <div className="mt-[3.6rem] w-full">
            <p className="body2-m pb-[0.2rem] text-default">비밀번호</p>
            <Input type="password" placeholder="비밀번호를 입력해주세요" />
          </div>

          <div className="mt-[3.6rem] mb-[1.6rem] w-full">
            <p className="body2-m pb-[0.2rem] text-default">비밀번호 확인</p>
            <Input type="password" placeholder="비밀번호를 다시 입력해주세요" />
          </div>
        </div>
      </section>

      <div className="shrink-0 px-[1.6rem] py-[1.6rem]">
        <Button
          type="button"
          size="lg"
          kind="default"
          variant="primary"
          onClick={handleSignup}
        >
          회원가입
        </Button>
      </div>
    </main>
  );
}