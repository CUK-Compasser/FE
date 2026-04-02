"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Input, Button } from "@compasser/design-system";
import { useVerifyBusinessMutation } from "@/shared/queries/mutation/auth/useVerifyBusinessMutation";
import { useOwnerSignupStore } from "@/shared/stores/ownerSignup.store";
import {
  normalizeBusinessNumber,
  isValidBusinessNumberFormat,
  isValidBusinessNumber,
} from "@/shared/utils/businessLicense";

export default function BusinessSignupPage() {
  const router = useRouter();
  const verifyMutation = useVerifyBusinessMutation();

  const signupCompleted = useOwnerSignupStore((s) => s.signupCompleted);
  const email = useOwnerSignupStore((s) => s.email);
  const setBusinessCompleted = useOwnerSignupStore(
    (s) => s.setBusinessCompleted,
  );

  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!signupCompleted) {
      router.replace("/signup");
    }
  }, [signupCompleted, router]);

  const handleChange = (v: string) => {
    const normalized = normalizeBusinessNumber(v);

    if (normalized.length > 10) return;

    setValue(normalized);

    if (error) setError("");
  };

  const validate = () => {
    if (!value) return "사업자 번호를 입력해주세요.";

    if (!isValidBusinessNumberFormat(value))
      return "사업자 번호는 10자리 숫자입니다.";

    if (!isValidBusinessNumber(value))
      return "유효하지 않은 사업자 번호입니다.";

    return "";
  };

  const handleNext = () => {
    const message = validate();

    if (message) {
      setError(message);
      return;
    }

    if (!email) {
      router.replace("/signup");
      return;
    }

    verifyMutation.mutate(
      {
        businessLicenseNumber: value,
        email,
      },
      {
        onSuccess: (res) => {
          if (res.alreadyUpgraded) {
            setError("이미 사업자 등록이 완료된 계정입니다.");
            return;
          }

          setBusinessCompleted();
          router.push("/signup/register");
        },
        onError: () => {
          setError("사업자 번호 인증에 실패했습니다.");
        },
      },
    );
  };

  return (
    <main className="flex h-screen w-full flex-col bg-white">
      <section className="min-h-0 flex-1 overflow-y-auto px-[1.6rem]">
        <div className="pt-[36rem]">
          <div className="w-full">
            <p className="body2-m pb-[0.8rem] text-default">
              사업자 등록번호를 입력해주세요!
            </p>

            <Input
              type="text"
              inputMode="numeric"
              placeholder="'-' 기호 없이 숫자만 입력해주세요"
              value={value}
              onChange={(e) => handleChange(e.target.value)}
              error={!!error}
              errorMessage={error}
            />
          </div>
        </div>
      </section>

      <div className="shrink-0 px-[1.6rem] py-[1.6rem]">
        <Button
          type="button"
          size="lg"
          variant="primary"
          onClick={handleNext}
          disabled={verifyMutation.isPending}
        >
          {verifyMutation.isPending ? "확인 중..." : "다음으로"}
        </Button>
      </div>
    </main>
  );
}