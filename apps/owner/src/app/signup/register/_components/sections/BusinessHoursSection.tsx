"use client";

import { Button, Icon } from "@compasser/design-system";

type BusinessHoursRow = {
  dayLabel: string;
  time: string;
};

interface BusinessHoursSectionProps {
  businessHoursRows: BusinessHoursRow[];
  onOpenBusinessHoursModal: () => void;
}

export default function BusinessHoursSection({
  businessHoursRows,
  onOpenBusinessHoursModal,
}: BusinessHoursSectionProps) {
  return (
    <div className="mt-[3.6rem] w-full">
      <div className="flex items-center justify-between">
        <p className="body2-m pb-[0.2rem] text-default">영업시간 등록</p>

        <Button
          type="button"
          kind="register"
          variant="outline-primary"
          fullWidth={false}
          onClick={onOpenBusinessHoursModal}
          className="body1-m border border-primary-variant text-primary-variant"
        >
          등록하기
        </Button>
      </div>

      <div className="flex items-start pt-[0.4rem]">
        <div className="shrink-0 pt-[0.2rem]">
          <Icon name="Clock" width={20} height={20} />
        </div>

        <div className="ml-[0.4rem] flex flex-col gap-[0.4rem]">
          {businessHoursRows.map((row) => (
            <div key={row.dayLabel} className="flex items-center gap-[0.4rem]">
              <span className="body2-r text-default">{row.dayLabel}</span>
              <span className="body2-r text-default">{row.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}