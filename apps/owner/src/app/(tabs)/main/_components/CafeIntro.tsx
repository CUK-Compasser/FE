"use client";

import { useState } from "react";
import { Icon } from "@compasser/design-system";
import QRStampModal from "./QRStampModal";

interface CafeIntroProps {
  cafeName: string;
}

const formatCafeName = (name: string) => {
  if (name.length <= 10) {
    return { firstLine: name, secondLine: "" };
  }

  const firstTen = name.slice(0, 10);
  const spaceIndexes = [...firstTen]
    .map((char, index) => (char === " " ? index : -1))
    .filter((index) => index !== -1);

  if (spaceIndexes.length >= 2) {
    const breakIndex = spaceIndexes[1];

    return {
      firstLine: name.slice(0, breakIndex).trim(),
      secondLine: name.slice(breakIndex + 1).trim(),
    };
  }

  return {
    firstLine: name.slice(0, 10).trim(),
      secondLine: name.slice(10).trim(),
  };
};

export default function CafeIntro({ cafeName }: CafeIntroProps) {
  const { firstLine, secondLine } = formatCafeName(cafeName);
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);

  const handleOpenQrModal = () => {
    setIsQrModalOpen(true);
  };

  const handleCloseQrModal = () => {
    setIsQrModalOpen(false);
  };

  const handleSubmitStamp = () => {
    console.log("적립하기");
  };

  return (
    <>
      <section className="flex items-start justify-between">
        <div className="pt-[0.5rem]">
          <p className="head3-m text-gray-700">어서오세요!</p>

          <div className="mt-[0.4rem]">
            <p
              className="head2-m whitespace-pre-line text-primary"
              style={{ textShadow: "0 4px 3px rgba(0, 0, 0, 0.2)" }}
            >
              {firstLine}
              {secondLine ? `\n${secondLine}` : ""}
            </p>
          </div>

          <p className="mt-[0.4rem] head3-m text-gray-700">입니다.</p>
        </div>

        <Icon
          name="Stamp"
          width={100}
          height={100}
          className="shrink-0 cursor-pointer"
          isInteractive
          onClick={handleOpenQrModal}
        />
      </section>

      <QRStampModal
        open={isQrModalOpen}
        onClose={handleCloseQrModal}
        onSubmit={handleSubmitStamp}
      />
    </>
  );
}