"use client";

import { Button, Input } from "@compasser/design-system";

interface StoreAddressFieldProps {
  onSearchAddress: () => void;
}

export default function StoreAddressField({
  onSearchAddress,
}: StoreAddressFieldProps) {
  return (
    <div className="mt-[3.6rem] w-full">
      <p className="body2-m pb-[0.2rem] text-default">상점 주소</p>

      <div className="flex items-end gap-[1rem]">
        <div className="min-w-0 flex-1">
          <Input type="text" placeholder="상점 주소를 입력해주세요" />
        </div>

        <Button
          type="button"
          kind="default"
          size="lg"
          variant="primary"
          fullWidth={false}
          onClick={onSearchAddress}
          className="body1-m shrink-0 px-[2.1rem] py-[1.15rem] text-inverse"
        >
          검색
        </Button>
      </div>
    </div>
  );
}