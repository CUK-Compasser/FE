"use client";

import { Icon, Modal } from "@compasser/design-system";
import type { MainSort } from "../_types/main-list";

interface SortOptionModalProps {
  open: boolean;
  selectedSort: MainSort;
  onClose: () => void;
  onSelectSort: (sort: MainSort) => void;
}

const SORT_OPTIONS: MainSort[] = ["가게 등록순", "가격순", "추천순"];

export default function SortOptionModal({
  open,
  selectedSort,
  onClose,
  onSelectSort,
}: SortOptionModalProps) {
  const handleSelect = (sort: MainSort) => {
    onSelectSort(sort);
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      variant="default"
      bodyClassName="p-0"
      className="overflow-hidden p-0"
    >
      <div className="w-full py-[1.6rem]">
        {SORT_OPTIONS.map((sort, index) => {
          const isSelected = selectedSort === sort;
          const isMiddle = index === 1;

          return (
            <button
              key={sort}
              type="button"
              onClick={() => handleSelect(sort)}
              className={[
                "flex w-full items-center justify-between px-[1rem] py-[1rem] text-left",
                isMiddle ? "border-y border-gray-200" : "",
              ].join(" ")}
            >
              <span className="body2-r text-default">{sort}</span>

              <Icon
                name={isSelected ? "RadioActive" : "RadioDeactive"}
                width={20}
                height={20}
                ariaHidden={false}
              />
            </button>
          );
        })}
      </div>
    </Modal>
  );
}