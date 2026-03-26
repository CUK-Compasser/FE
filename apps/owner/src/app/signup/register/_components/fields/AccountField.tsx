"use client";

import { Input, Tag } from "@compasser/design-system";
import type { AccountType } from "../../_types/register";

interface AccountFieldProps {
  selectedAccountType: AccountType | null;
  onSelectAccountType: (type: AccountType) => void;
}

export default function AccountField({
  selectedAccountType,
  onSelectAccountType,
}: AccountFieldProps) {
  return (
    <div className="mt-[3.6rem] w-full">
      <p className="body2-m pb-[0.2rem] text-default">계좌번호</p>

      <div className="flex gap-[0.8rem] pb-[0.4rem]">
        <Tag
          variant="rounded-rect"
          selected={selectedAccountType === "bank"}
          changeOnClick={false}
          onClick={() => onSelectAccountType("bank")}
        >
          은행
        </Tag>

        <Tag
          variant="rounded-rect"
          selected={selectedAccountType === "holder"}
          changeOnClick={false}
          onClick={() => onSelectAccountType("holder")}
        >
          예금주명
        </Tag>
      </div>

      <Input type="text" placeholder="계좌번호를 입력해주세요" />
    </div>
  );
}