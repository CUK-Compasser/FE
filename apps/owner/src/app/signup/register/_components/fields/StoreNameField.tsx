"use client";

import { Input } from "@compasser/design-system";

interface StoreNameFieldProps {
  value: string;
  onChange: (value: string) => void;
}

export default function StoreNameField({
  value,
  onChange,
}: StoreNameFieldProps) {
  return (
    <div className="w-full">
      <p className="body2-m py-[0.2rem] text-default">상점 이름</p>
      <Input
        type="text"
        placeholder="상점 이름을 입력해주세요"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}