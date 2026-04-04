"use client";

import { Card, Icon } from "@compasser/design-system";

interface PurchaseNoticeCardProps {
  noticeList: string[];
}

export default function PurchaseNoticeCard({
  noticeList,
}: PurchaseNoticeCardProps) {
  return (
    <Card
      variant="primary-variant-bordered"
      className="mt-[4rem] flex flex-col gap-[0.4rem]"
    >
      {noticeList.map((text) => (
        <div key={text} className="flex items-start">
          <div className="mt-[0.15rem] shrink-0">
            <Icon name="Check" width={16} height={16} ariaHidden={false} />
          </div>
          <p className="ml-[0.4rem] body2-r text-default">{text}</p>
        </div>
      ))}
    </Card>
  );
}