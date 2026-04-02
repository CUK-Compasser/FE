"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { LoginReqDTO } from "@compasser/api";
import LoginForm from "./_components/LoginForm";
import KakaoLoginButton from "./_components/KakaoLoginButton";
import SignupLinkButton from "./_components/SignupLinkButton";
import { LOGIN_TEXT } from "./_constants/login.constants";
import { useLoginMutation } from "@/shared/queries/mutation/auth/useLoginMutation";

export default function LoginPage() {
  const router = useRouter();
  const loginMutation = useLoginMutation();

  const [formValues, setFormValues] = useState<LoginReqDTO>({
    email: "",
    password: "",
  });

  const handleMoveRoleSelect = () => {
    router.push("/role-select");
  };

  const handleChangeEmail = (value: string) => {
    setFormValues((prev) => ({
      ...prev,
      email: value,
    }));
  };

  const handleChangePassword = (value: string) => {
    setFormValues((prev) => ({
      ...prev,
      password: value,
    }));
  };

  const handleLogin = () => {
    const email = formValues.email.trim();
    const password = formValues.password.trim();

    if (!email || !password) {
      console.log(LOGIN_TEXT.emptyFieldMessage);
      return;
    }

    loginMutation.mutate(
      {
        email,
        password,
      },
      {
        onSuccess: (response) => {
          const accessToken = response.data.accessToken;

          if (typeof window !== "undefined") {
            localStorage.setItem("accessToken", accessToken);
          }

          router.push("/main");
        },
        onError: (error) => {
          console.log("일반 로그인 실패", error);
        },
      },
    );
  };

  const handleKakaoLogin = () => {
    console.log("카카오 로그인");
  };

  return (
    <main className="flex min-h-screen w-full items-center justify-center px-[1.6rem]">
      <section className="w-full">
        <div className="flex flex-col">
          <LoginForm
            values={formValues}
            isPending={loginMutation.isPending}
            onChangeEmail={handleChangeEmail}
            onChangePassword={handleChangePassword}
            onSubmit={handleLogin}
          />

          <div className="mt-[1.2rem] w-full">
            <KakaoLoginButton onClick={handleKakaoLogin} />
          </div>

          <SignupLinkButton onClick={handleMoveRoleSelect} />
        </div>
      </section>
    </main>
  );
}