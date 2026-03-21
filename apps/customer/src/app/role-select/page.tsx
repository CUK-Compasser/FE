"use client";

import { useRouter } from "next/navigation";
import { Card, Icon } from "@compasser/design-system";

export default function RoleSelectPage() {
  const router = useRouter();

  return (
    <main className="flex h-screen flex-col px-[1.6rem]">
      <section className="flex flex-1 items-center justify-center">
        <div className="flex w-full gap-[1.2rem]">
          <button
            type="button"
            onClick={() => router.push("/signup")}
            className="min-w-0 flex-1 text-left"
            aria-label="고객으로 시작하기"
          >
            <Card variant="role-select" className="w-full">
              <div className="flex flex-col items-center py-[2.7rem]">
                <Icon
                  name="CustomerSelect"
                  width={163}
                  height={163}
                  color="primary"
                  ariaHidden={false}
                />
                <div className="head1-sb text-primary">고객</div>
              </div>
            </Card>
          </button>

          <button
            type="button"
            onClick={() => router.push("/signup")}
            className="min-w-0 flex-1 text-left"
            aria-label="사장으로 시작하기"
          >
            <Card variant="role-select" className="w-full">
              <div className="flex flex-col items-center py-[2.7rem]">
                <Icon
                  name="OwnerSelect"
                  width={163}
                  height={163}
                  color="primary"
                  ariaHidden={false}
                />
                <div className="head1-sb text-primary">사장</div>
              </div>
            </Card>
          </button>
        </div>
      </section>

      <p className="body1-m whitespace-pre-line pb-[5.4rem] text-center text-gray-600">
        {"고객 또는 사장님으로\n서비스를 이용할 수 있어요"}
      </p>
    </main>
  );
}