"use client";

import { useRouter } from "next/navigation";
import { Input, Button } from "@compasser/design-system";

export default function BusinessSignupPage() {
  const router = useRouter();

  const handleNext = () => {
    router.push("/signup/register");
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
              placeholder="'-' 기호 없이 숫자만 입력해주세요"
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
          onClick={handleNext}
        >
          다음으로
        </Button>
      </div>
    </main>
  );
}