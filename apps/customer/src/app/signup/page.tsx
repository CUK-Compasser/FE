"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input, Button } from "@compasser/design-system";
import { useSignupMutation } from "@/shared/queries/mutation/auth/useSignupMutation";

export default function SignupPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [submitError, setSubmitError] = useState("");

  const { mutateAsync: signUp, isPending } = useSignupMutation();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const isEmailInvalid = email.length > 0 && !emailRegex.test(email);

  const isPasswordMismatch =
    password.length > 0 &&
    passwordConfirm.length > 0 &&
    password !== passwordConfirm;

  const isFormInvalid =
    !name.trim() ||
    !nickname.trim() ||
    !email.trim() ||
    !password.trim() ||
    !passwordConfirm.trim() ||
    isEmailInvalid ||
    isPasswordMismatch;

  const handleSignup = async () => {
    if (isFormInvalid || isPending) return;

    setSubmitError("");

    try {
      await signUp({
        memberName: name,
        nickname,
        email,
        password,
        passwordConfirm,
      });

      router.push("/login");
    } catch (error) {
      console.error("회원가입 실패", error);

      setSubmitError(
        error instanceof Error
          ? error.message
          : "회원가입 중 오류가 발생했습니다.",
      );
    }
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
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="mt-[3.6rem] w-full">
            <p className="body2-m pb-[0.2rem] text-default">닉네임</p>
            <Input
              type="text"
              placeholder="닉네임을 입력해주세요"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
          </div>

          <div className="mt-[3.6rem] w-full">
            <p className="body2-m pb-[0.2rem] text-default">이메일</p>
            <Input
              type="email"
              placeholder="이메일을 입력해주세요"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={isEmailInvalid}
              errorMessage="이메일 형식이 올바르지 않습니다."
            />
          </div>

          <div className="mt-[3.6rem] w-full">
            <p className="body2-m pb-[0.2rem] text-default">비밀번호</p>
            <Input
              type="password"
              placeholder="비밀번호를 입력해주세요"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={isPasswordMismatch}
              errorMessage="비밀번호가 일치하지 않습니다."
            />
          </div>

          <div className="mt-[3.6rem] mb-[1.6rem] w-full">
            <p className="body2-m pb-[0.2rem] text-default">비밀번호 확인</p>
            <Input
              type="password"
              placeholder="비밀번호를 다시 입력해주세요"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              error={isPasswordMismatch}
              errorMessage="비밀번호가 일치하지 않습니다."
            />
          </div>

          {submitError ? (
            <p className="body3-m text-red-500">{submitError}</p>
          ) : null}
        </div>
      </section>

      <div className="shrink-0 px-[1.6rem] py-[1.6rem]">
        <Button
          type="button"
          size="lg"
          kind="default"
          variant="primary"
          onClick={handleSignup}
          disabled={isFormInvalid || isPending}
        >
          {isPending ? "회원가입 중..." : "회원가입"}
        </Button>
      </div>
    </main>
  );
}