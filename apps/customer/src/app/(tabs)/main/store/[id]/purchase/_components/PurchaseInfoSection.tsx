"use client";

interface PurchaseInfoSectionProps {
  bankName: string;
  accountNumber: string;
  depositor: string;
  totalPrice: number;
}

export default function PurchaseInfoSection({
  bankName,
  accountNumber,
  depositor,
  totalPrice,
}: PurchaseInfoSectionProps) {
  return (
    <div className="mt-[2.4rem]">
      <h2 className="head3-m text-default">결제 정보</h2>

      <div className="mt-[0.8rem] border-t border-gray-500 border-dashed" />

      <div className="mt-[1rem] flex items-start justify-between">
        <div className="flex flex-col gap-[0.8rem]">
          <p className="body1-m text-gray-600">계좌정보</p>
          <p className="body1-m text-gray-600">예금주명</p>
          <p className="body1-m text-gray-600">총 결제금액</p>
        </div>

        <div className="flex flex-col gap-[0.8rem]">
          <p className="body1-r text-default">
            {bankName}
            {accountNumber}
          </p>
          <p className="body1-r text-default">{depositor}</p>
          <p className="body1-r text-default">{totalPrice.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}