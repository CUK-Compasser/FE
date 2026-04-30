"use client";

import { useState } from "react";
import { Icon } from "@compasser/design-system";
import { RewardQrModal } from "./RewardQrModal";

interface ProfileSectionProps {
  memberName?: string;
  nickname?: string;
  email?: string;
  isLoading?: boolean;
}

export const ProfileSection = ({
  memberName,
  nickname,
  email,
  isLoading = false,
}: ProfileSectionProps) => {
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);

  const handleOpenQrModal = () => {
    setIsQrModalOpen(true);
  };

  const handleCloseQrModal = () => {
    setIsQrModalOpen(false);
  };

  return (
    <>
      <section className="bg-background px-[1.6rem] pt-[4.2rem] pb-[3.2rem]">
        <div className="flex items-start justify-between">
          <div className="flex min-w-0 items-center">
            <div className="shrink-0">
              <Icon
                name="ProfileCharacter"
                width={80}
                height={80}
                ariaHidden={true}
              />
            </div>

            <div className="ml-[0.8rem] min-w-0 body1-m text-default">
              {isLoading ? (
                <>
                  <p>-</p>
                  <p>-</p>
                  <p>-</p>
                </>
              ) : (
                <>
                  <p>{memberName ?? "-"}</p>
                  <p>{nickname ?? "-"}</p>
                  <p>{email ?? "-"}</p>
                </>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={handleOpenQrModal}
            className="body1-m shrink-0 rounded-[999px] border-[1.5px] border-primary px-[1rem] py-[0.6rem] text-primary"
          >
            적립 QR
          </button>
        </div>
      </section>

      <RewardQrModal open={isQrModalOpen} onClose={handleCloseQrModal} />
    </>
  );
};