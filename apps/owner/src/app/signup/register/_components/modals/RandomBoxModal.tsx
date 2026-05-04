"use client";

import { useEffect, useState } from "react";
import { Button, Input, Modal, cn } from "@compasser/design-system";

interface PickupTimeInfo {
  start: string;
  end: string;
}

interface RandomBoxFormValue {
  boxName: string;
  stock: number;
  price: number;
  buyLimit: number;
  content: string;
  pickupTimeInfo: PickupTimeInfo;
  boxId?: number;
}

interface RandomBoxModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit?: (data: RandomBoxFormValue) => void | Promise<void>;
  initialValue?: RandomBoxFormValue | null;
}

const initialFormValue: RandomBoxFormValue = {
  boxName: "",
  stock: 0,
  price: 0,
  buyLimit: 0,
  content: "",
  pickupTimeInfo: {
    start: "",
    end: "",
  },
};

export default function RandomBoxModal({
  open,
  onClose,
  onSubmit,
  initialValue,
}: RandomBoxModalProps) {
  const [form, setForm] = useState<RandomBoxFormValue>(initialFormValue);

  useEffect(() => {
    if (!open) {
      setForm(initialFormValue);
      return;
    }

    if (initialValue) {
      setForm(initialValue);
      return;
    }

    setForm(initialFormValue);
  }, [open, initialValue]);

  const updateField = <K extends keyof RandomBoxFormValue>(
    key: K,
    value: RandomBoxFormValue[K],
  ) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const updatePickupTime = (key: keyof PickupTimeInfo, value: string) => {
    setForm((prev) => ({
      ...prev,
      pickupTimeInfo: {
        ...prev.pickupTimeInfo,
        [key]: value,
      },
    }));
  };

  const handleSubmit = async () => {
    if (!form.boxName.trim()) return;
    if (form.stock <= 0) return;
    if (form.price < 0) return;
    if (form.buyLimit <= 0) return;
    if (!form.pickupTimeInfo.start) return;
    if (!form.pickupTimeInfo.end) return;

    await onSubmit?.(form);
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      variant="default"
      closeOnOverlayClick
      className="w-[91%] border border-primary px-[1rem] py-[2rem]"
      bodyClassName="mt-0"
    >
      <div className="flex flex-col gap-[1.6rem]">
        <div className="flex w-full items-center justify-between gap-[1.6rem]">
          <p className="body1-r shrink-0 text-gray-700">랜덤박스 이름</p>

          <Input
            value={form.boxName}
            onChange={(event) => updateField("boxName", event.target.value)}
            className="w-[17rem]"
            containerClassName="border-gray-300"
            inputClassName="text-gray-600"
          />
        </div>

        <div className="flex w-full items-center justify-between gap-[1.6rem]">
          <p className="body1-r shrink-0 text-gray-700">총 수량</p>

          <Input
            type="number"
            value={String(form.stock)}
            onChange={(event) =>
              updateField("stock", Number(event.target.value || 0))
            }
            className="w-[17rem]"
            containerClassName="border-gray-300"
            inputClassName="text-gray-600"
          />
        </div>

        <div className="flex w-full items-center justify-between gap-[1.6rem]">
          <p className="body1-r shrink-0 text-gray-700">가격</p>

          <Input
            type="number"
            value={String(form.price)}
            onChange={(event) =>
              updateField("price", Number(event.target.value || 0))
            }
            className="w-[17rem]"
            containerClassName="border-gray-300"
            inputClassName="text-gray-600"
          />
        </div>

        <div className="flex w-full items-center justify-between gap-[1.6rem]">
          <p className="body1-r shrink-0 text-gray-700">구매 제한 개수</p>

          <Input
            type="number"
            value={String(form.buyLimit)}
            onChange={(event) =>
              updateField("buyLimit", Number(event.target.value || 0))
            }
            className="w-[17rem]"
            containerClassName="border-gray-300"
            inputClassName="text-gray-600"
          />
        </div>

        <div className="flex w-full items-center justify-between gap-[1.6rem]">
          <p className="body1-r shrink-0 text-gray-700">픽업 시작 시간</p>

          <Input
            type="time"
            value={form.pickupTimeInfo.start}
            onChange={(event) => updatePickupTime("start", event.target.value)}
            className="w-[17rem]"
            containerClassName="border-gray-300"
            inputClassName="text-gray-600"
          />
        </div>

        <div className="flex w-full items-center justify-between gap-[1.6rem]">
          <p className="body1-r shrink-0 text-gray-700">픽업 종료 시간</p>

          <Input
            type="time"
            value={form.pickupTimeInfo.end}
            onChange={(event) => updatePickupTime("end", event.target.value)}
            className="w-[17rem]"
            containerClassName="border-gray-300"
            inputClassName="text-gray-600"
          />
        </div>

        <div>
          <p className="body1-r text-gray-700">랜덤박스 설명란</p>

          <textarea
            value={form.content}
            onChange={(event) => updateField("content", event.target.value)}
            className={cn(
              "mt-[0.4rem] h-[15rem] w-full resize-none rounded-[8px] border border-gray-300 px-[1rem] py-[1rem]",
              "body1-r text-gray-700 outline-none placeholder:text-gray-500",
            )}
          />
        </div>

        <div className="pt-[1.6rem]">
          <Button
            type="button"
            variant="primary"
            size="lg"
            kind="default"
            onClick={handleSubmit}
          >
            {form.boxId ? "수정하기" : "추가하기"}
          </Button>
        </div>
      </div>
    </Modal>
  );
}