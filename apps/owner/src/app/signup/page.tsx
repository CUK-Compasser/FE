"use client";

import { useState } from "react";
import { Input, Button } from "@compasser/design-system";
import { useRouter } from "next/navigation";
import type { JoinReqDTO } from "@compasser/api";
import { useSignupMutation } from "@/shared/queries/mutation/auth/useSignupMutation";
import { useOwnerSignupStore } from "@/shared/stores/ownerSignup.store";

export default function SignupPage() {
  const router = useRouter();
  const signupMutation = useSignupMutation();
  const setSignupCompleted = useOwnerSignupStore(
    (state) => state.setSignupCompleted,
  );

  const [formValues, setFormValues] = useState<JoinReqDTO>({
    memberName: "",
    nickname: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const handleChange =
    (key: keyof JoinReqDTO) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;

      setFormValues((prev) => ({
        ...prev,
        [key]: value,
      }));
    };

  const handleSignup = () => {
    const memberName = formValues.memberName.trim();
    const nickname = formValues.nickname.trim();
    const email = formValues.email.trim();
    const password = formValues.password.trim();
    const passwordConfirm = formValues.passwordConfirm.trim();

    if (
      !memberName ||
      !nickname ||
      !email ||
      !password ||
      !passwordConfirm
    ) {
      console.log("모든 항목을 입력해주세요.");
      return;
    }

    signupMutation.mutate(
      {
        memberName,
        nickname,
        email,
        password,
        passwordConfirm,
      },
      {
        onSuccess: () => {
          setSignupCompleted(email);
          router.push("/signup/business");
        },
        onError: (error) => {
          console.log("회원가입 실패", error);
        },
      },
    );
  };

  return (
    <main className="flex h-screen w-full flex-col bg-white">
      <section className="min-h-0 flex-1 overflow-y-auto px-[1.6rem]">
        <div className="pt-[3.6rem]">
          <div className="w-full">
            <p className="body2-m pb-[0.2rem] text-default">이름</p>
            <Input
              type="text"
              placeholder="이름을 입력해주세요"
              value={formValues.memberName}
              onChange={handleChange("memberName")}
            />
          </div>

          <div className="mt-[3.6rem] w-full">
            <p className="body2-m pb-[0.2rem] text-default">닉네임</p>
            <Input
              type="text"
              placeholder="닉네임을 입력해주세요"
              value={formValues.nickname}
              onChange={handleChange("nickname")}
            />
          </div>

          <div className="mt-[3.6rem] w-full">
            <p className="body2-m pb-[0.2rem] text-default">이메일</p>
            <Input
              type="email"
              placeholder="이메일을 입력해주세요"
              value={formValues.email}
              onChange={handleChange("email")}
            />
          </div>

          <div className="mt-[3.6rem] w-full">
            <p className="body2-m pb-[0.2rem] text-default">비밀번호</p>
            <Input
              type="password"
              placeholder="비밀번호를 입력해주세요"
              value={formValues.password}
              onChange={handleChange("password")}
            />
          </div>

          <div className="mt-[3.6rem] mb-[1.6rem] w-full">
            <p className="body2-m pb-[0.2rem] text-default">비밀번호 확인</p>
            <Input
              type="password"
              placeholder="비밀번호를 다시 입력해주세요"
              value={formValues.passwordConfirm}
              onChange={handleChange("passwordConfirm")}
            />
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
          disabled={signupMutation.isPending}
        >
          {signupMutation.isPending ? "회원가입 중..." : "회원가입"}
        </Button>
      </div>
    </main>
  );
}