"use client";

import { Card } from "@compasser/design-system";

export const AccountCard = () => {
  return (
    <Card variant="gray-200-elevated">
      <div>
        <p className="body1-m text-primary">내 계정</p>

        <div className="mt-[0.8rem] border-t border-gray-200 px-[1rem] py-[1rem]">
          <div className="flex flex-col items-start gap-[1.2rem]">
            <button type="button" className="body2-r text-default">
              로그아웃
            </button>
            <button type="button" className="body2-r text-default">
              회원탈퇴
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
};