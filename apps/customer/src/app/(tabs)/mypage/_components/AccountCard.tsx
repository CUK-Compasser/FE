"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@compasser/design-system";
import { ConfirmActionModal } from "./ConfirmActionModal";
import { useLogoutMutation } from "@/shared/queries/mutation/auth/useLogoutMutation";

export const AccountCard = () => {
  const router = useRouter();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);

  const { mutate: logout, isPending } = useLogoutMutation();

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        setIsLogoutModalOpen(false);
        router.replace("/login");
      },
    });
  };

  return (
    <>
      <Card variant="gray-200-elevated">
        <div>
          <p className="body1-m text-primary">내 계정</p>

          <div className="mt-[0.8rem] border-t border-gray-200 px-[1rem] py-[1rem]">
            <div className="flex flex-col items-start gap-[1.2rem]">
              <button
                type="button"
                onClick={() => setIsLogoutModalOpen(true)}
                className="body2-r text-default"
              >
                로그아웃
              </button>

              <button
                type="button"
                onClick={() => setIsWithdrawModalOpen(true)}
                className="body2-r text-default"
              >
                회원탈퇴
              </button>
            </div>
          </div>
        </div>
      </Card>

      <ConfirmActionModal
        open={isLogoutModalOpen}
        title="로그아웃하시겠습니까?"
        cancelText="그만두기"
        confirmText={isPending ? "로그아웃 중..." : "로그아웃"}
        cancelVariant="gray"
        confirmVariant="primary"
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleLogout}
      />

      <ConfirmActionModal
        open={isWithdrawModalOpen}
        title="탈퇴하시겠습니까?"
        cancelText="그만두기"
        confirmText="탈퇴하기"
        cancelVariant="gray"
        confirmVariant="secondary"
        onClose={() => setIsWithdrawModalOpen(false)}
        onConfirm={() => {
          setIsWithdrawModalOpen(false);
          router.replace("/login");
        }}
        reverseButtons={true}
      />
    </>
  );
};