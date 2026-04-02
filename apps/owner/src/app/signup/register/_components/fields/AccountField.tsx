"use client";

import { useMemo, useState } from "react";
import { Input, Tag } from "@compasser/design-system";
import {
  filterBankNames,
  normalizeAccountNumber,
} from "@/shared/utils/bank";

interface AccountFieldProps {
  bankName: string;
  depositor: string;
  bankAccount: string;
  onChangeBankName: (value: string) => void;
  onChangeDepositor: (value: string) => void;
  onChangeBankAccount: (value: string) => void;
}

export default function AccountField({
  bankName,
  depositor,
  bankAccount,
  onChangeBankName,
  onChangeDepositor,
  onChangeBankAccount,
}: AccountFieldProps) {
  const [bankKeyword, setBankKeyword] = useState("");

  const filteredBanks = useMemo(() => {
    return filterBankNames(bankKeyword);
  }, [bankKeyword]);

  const handleChangeBankName = (nextValue: string) => {
    onChangeBankName(nextValue);
    setBankKeyword(nextValue);
  };

  const handleChangeBankAccount = (nextValue: string) => {
    onChangeBankAccount(normalizeAccountNumber(nextValue));
  };

  return (
    <div className="mt-[3.6rem] w-full">
      <p className="body2-m pb-[0.2rem] text-default">계좌 정보</p>

      <div className="flex flex-col gap-[1.2rem]">
        <div>
          <div className="flex gap-[0.8rem] pb-[0.4rem]">
            <Tag variant="rounded-rect" selected changeOnClick={false}>
              은행
            </Tag>
          </div>

          <Input
            type="text"
            placeholder="은행명을 입력해주세요"
            value={bankName}
            onChange={(e) => handleChangeBankName(e.target.value)}
          />

          {bankKeyword.trim() !== "" && (
            <div className="mt-[0.8rem] flex flex-wrap gap-[0.6rem]">
              {filteredBanks.map((bank) => (
                <Tag
                  key={bank}
                  variant="rounded-rect"
                  selected={bankName === bank}
                  changeOnClick={false}
                  onClick={() => {
                    onChangeBankName(bank);
                    setBankKeyword(bank);
                  }}
                >
                  {bank}
                </Tag>
              ))}
            </div>
          )}
        </div>

        <div>
          <div className="flex gap-[0.8rem] pb-[0.4rem]">
            <Tag variant="rounded-rect" selected changeOnClick={false}>
              예금주명
            </Tag>
          </div>

          <Input
            type="text"
            placeholder="예금주명을 입력해주세요"
            value={depositor}
            onChange={(e) => onChangeDepositor(e.target.value)}
          />
        </div>

        <div>
          <div className="flex gap-[0.8rem] pb-[0.4rem]">
            <Tag variant="rounded-rect" selected changeOnClick={false}>
              계좌번호
            </Tag>
          </div>

          <Input
            type="text"
            placeholder="계좌번호를 입력해주세요"
            value={bankAccount}
            onChange={(e) => handleChangeBankAccount(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}