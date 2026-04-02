"use client";

import { Button, Card } from "@compasser/design-system";
import type { RandomBoxRespDTO } from "@compasser/api";

interface RandomBoxSectionProps {
  randomBoxes: RandomBoxRespDTO[];
  selectedRandomBoxIds: number[];
  onToggleRandomBoxSelection: (id: number) => void;
  onDeleteRandomBoxes: () => void;
  onAddRandomBox: () => void;
}

export default function RandomBoxSection({
  randomBoxes,
  selectedRandomBoxIds,
  onToggleRandomBoxSelection,
  onDeleteRandomBoxes,
  onAddRandomBox,
}: RandomBoxSectionProps) {
  return (
    <div className="mt-[3.6rem] w-full">
      <div className="flex items-center justify-between">
        <p className="body2-m pb-[0.2rem] text-default">랜덤박스 등록</p>

        <div className="flex items-center">
          <Button
            type="button"
            kind="register"
            variant="outline-gray"
            fullWidth={false}
            onClick={onDeleteRandomBoxes}
            className="body1-m border border-gray-600 text-gray-600"
          >
            삭제하기
          </Button>

          <div className="w-[1.2rem]" />

          <Button
            type="button"
            kind="register"
            variant="outline-primary"
            fullWidth={false}
            onClick={onAddRandomBox}
            className="body1-m border border-primary-variant text-primary-variant"
          >
            추가하기
          </Button>
        </div>
      </div>

      <div className="pt-[0.4rem]">
        <Card variant="gray-300-bordered" className="overflow-hidden p-0">
          <div className="grid grid-cols-4 border-b border-gray-300 px-[1rem] py-[1rem]">
            <div className="body2-m text-center text-gray-600">이름</div>
            <div className="body2-m text-center text-gray-600">수량</div>
            <div className="body2-m text-center text-gray-600">가격</div>
            <div className="body2-m text-center text-gray-600">제한</div>
          </div>

          <div
            className={
              randomBoxes.length >= 3 ? "max-h-[13.2rem] overflow-y-auto" : ""
            }
          >
            {randomBoxes.map((item) => {
              const isSelected = selectedRandomBoxIds.includes(item.boxId);

              return (
                <button
                  key={item.boxId}
                  type="button"
                  onClick={() => onToggleRandomBoxSelection(item.boxId)}
                  className={`grid w-full grid-cols-4 px-[1rem] py-[1rem] text-center ${
                    isSelected ? "bg-background" : "bg-white"
                  }`}
                >
                  <div className="body2-r text-default">{item.boxName}</div>
                  <div className="body2-r text-default">{item.stock}</div>
                  <div className="body2-r text-default">
                    {item.price.toLocaleString()}
                  </div>
                  <div className="body2-r text-default">{item.buyLimit}</div>
                </button>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
}