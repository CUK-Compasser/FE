"use client";

import { Input } from "@compasser/design-system";

export default function StoreNameField() {
  return (
    <div className="w-full">
      <p className="body2-m py-[0.2rem] text-default">상점 이름</p>
      <Input type="text" placeholder="상점 이름을 입력해주세요" />
    </div>
  );
}