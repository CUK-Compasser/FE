"use client";

import { Input } from "@compasser/design-system";

export default function EmailField() {
  return (
    <div className="mt-[3.6rem] w-full">
      <p className="body2-m pb-[0.2rem] text-default">이메일</p>
      <Input type="email" placeholder="이메일을 입력해주세요" />
    </div>
  );
}