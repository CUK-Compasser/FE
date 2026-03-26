"use client";

import { useEffect, useState } from "react";
import { Button, Input, Modal, cn } from "@compasser/design-system";
import TimeRangeField from "./TimeRangeField";
import CountStepper from "./CountStepper";
import type { RandomBoxFormValue } from "../../_types/register";

interface RandomBoxModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit?: (data: RandomBoxFormValue) => void;
}

const initialFormValue: RandomBoxFormValue = {
  name: "",
  quantity: 0,
  limit: 0,
  pickupStartTime: "00:00",
  pickupEndTime: "00:00",
  description: "",
};

export default function RandomBoxModal({
  open,
  onClose,
  onSubmit,
}: RandomBoxModalProps) {
  const [form, setForm] = useState<RandomBoxFormValue>(initialFormValue);

  useEffect(() => {
    if (!open) {
      setForm(initialFormValue);
    }
  }, [open]);

  const updateField = <K extends keyof RandomBoxFormValue>(
    key: K,
    value: RandomBoxFormValue[K]
  ) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = () => {
    onSubmit?.(form);
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
            value={form.name}
            onChange={(event) => updateField("name", event.target.value)}
            className="w-[17rem]"
            containerClassName="border-gray-300"
            inputClassName="text-gray-600"
          />
        </div>

        <div className="flex w-full items-center gap-[1.6rem]">
          <p className="body1-r shrink-0 text-gray-700">총 수량</p>

          <div className="ml-auto flex w-[17rem] justify-start">
            <CountStepper
              value={form.quantity}
              onChange={(value) => updateField("quantity", value)}
              min={0}
            />
          </div>
        </div>

        <div className="flex w-full items-center gap-[1.6rem]">
          <p className="body1-r shrink-0 text-gray-700">구매 제한 개수</p>

          <div className="ml-auto flex w-[17rem] justify-start">
            <CountStepper
              value={form.limit}
              onChange={(value) => updateField("limit", value)}
              min={0}
            />
          </div>
        </div>

        <div className="flex w-full items-center gap-[1.6rem]">
          <p className="body1-r shrink-0 text-gray-700">픽업 시간</p>

          <div className="ml-auto flex w-[17rem] justify-start">
            <TimeRangeField
              startTime={form.pickupStartTime}
              endTime={form.pickupEndTime}
              onChangeStartTime={(value) => updateField("pickupStartTime", value)}
              onChangeEndTime={(value) => updateField("pickupEndTime", value)}
            />
          </div>
        </div>

        <div>
          <p className="body1-r text-gray-700">랜덤박스 설명란</p>

          <textarea
            value={form.description}
            onChange={(event) => updateField("description", event.target.value)}
            className={cn(
              "mt-[0.4rem] h-[15rem] w-full resize-none rounded-[8px] border border-gray-300 px-[1rem] py-[1rem]",
              "body1-r text-gray-700 outline-none placeholder:text-gray-500"
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
            추가하기
          </Button>
        </div>
      </div>
    </Modal>
  );
}