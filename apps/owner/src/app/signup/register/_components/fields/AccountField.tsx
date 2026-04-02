"use client";

import { useMemo, useState } from "react";
import { Input, Tag } from "@compasser/design-system";
import {
  filterBankNames,
  normalizeAccountNumber,
} from "@/shared/utils/bank";

type AccountStep = "bank" | "holder" | "account";

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
  const [step, setStep] = useState<AccountStep>("bank");
  const [bankKeyword, setBankKeyword] = useState(bankName);

  const filteredBanks = useMemo(() => {
    return filterBankNames(bankKeyword);
  }, [bankKeyword]);

  const currentValue =
    step === "bank"
      ? bankName
      : step === "holder"
        ? depositor
        : bankAccount;

  const currentPlaceholder =
    step === "bank"
      ? "은행명을 입력해주세요"
      : step === "holder"
        ? "예금주명을 입력해주세요"
        : "계좌번호를 입력해주세요";

  const handleChangeInput = (nextValue: string) => {
    if (step === "bank") {
      onChangeBankName(nextValue);
      setBankKeyword(nextValue);
      return;
    }

    if (step === "holder") {
      onChangeDepositor(nextValue);
      return;
    }

    onChangeBankAccount(normalizeAccountNumber(nextValue));
  };

  const handleSelectBank = (bank: string) => {
    onChangeBankName(bank);
    setBankKeyword(bank);
  };

  return (
    <div className="mt-[3.6rem] w-full">
      <p className="body2-m pb-[0.2rem] text-default">계좌 정보</p>

      <div className="flex gap-[0.8rem] pb-[0.4rem]">
        <Tag
          variant="rounded-rect"
          selected={step === "bank"}
          changeOnClick={false}
          onClick={() => setStep("bank")}
        >
          은행
        </Tag>

        <Tag
          variant="rounded-rect"
          selected={step === "holder"}
          changeOnClick={false}
          onClick={() => setStep("holder")}
        >
          예금주명
        </Tag>

        <Tag
          variant="rounded-rect"
          selected={step === "account"}
          changeOnClick={false}
          onClick={() => setStep("account")}
        >
          계좌번호
        </Tag>
      </div>

      <Input
        type="text"
        placeholder={currentPlaceholder}
        value={currentValue}
        onChange={(e) => handleChangeInput(e.target.value)}
      />

      {step === "bank" && bankKeyword.trim() !== "" && (
        <div className="mt-[0.8rem] flex flex-wrap gap-[0.6rem]">
          {filteredBanks.map((bank) => (
            <Tag
              key={bank}
              variant="rounded-rect"
              selected={bankName === bank}
              changeOnClick={false}
              onClick={() => handleSelectBank(bank)}
            >
              {bank}
            </Tag>
          ))}
        </div>
      )}
    </div>
  );
}