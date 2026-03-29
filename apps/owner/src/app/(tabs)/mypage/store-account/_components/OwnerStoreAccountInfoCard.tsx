"use client";

import { useRouter } from "next/navigation";
import { Card, Icon } from "@compasser/design-system";

export const OwnerStoreAccountInfoCard = () => {
  const router = useRouter();

  const handleMoveStoreInfoPage = () => {
    router.push("/mypage/store-info");
  };

  return (
    <Card variant="gray-200-elevated">
      <div>
        <div className="flex items-center justify-between">
          <p className="body1-m text-primary">내 계좌 정보</p>

          <button
            type="button"
            onClick={handleMoveStoreInfoPage}
            className="flex items-center gap-[0.2rem] text-gray-600"
          >
            <span className="body2-m text-gray-600">수정하기</span>
            <Icon
              name="NextButton"
              width={16}
              height={16}
              ariaHidden={true}
            />
          </button>
        </div>

        <div className="mt-[0.8rem] border-t border-gray-200 py-[1rem]">
          <div className="flex flex-col gap-[1.2rem]">
            <div className="flex items-center justify-between">
              <span className="body2-r text-default">은행명</span>
              <span className="body2-r text-gray-600">국민은행</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="body2-r text-default">계좌번호</span>
              <span className="body2-r text-gray-600">
                123-456-789012
              </span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};