"use client";

import { Card, Icon } from "@compasser/design-system";
import { stats } from "../_constants/stats";

export const StatsCard = () => {
  return (
    <Card variant="gray-200-elevated">
      <div>
        <div className="flex items-center justify-between">
          <p className="body1-m text-primary">전체 적립 현황</p>

          <button
            type="button"
            className="flex items-center gap-[0.2rem] text-gray-600"
          >
            <span className="body2-m text-gray-600">상세보기</span>
            <Icon
              name="NextButton"
              width={16}
              height={16}
              ariaHidden={true}
            />
          </button>
        </div>

        <div className="mt-[0.8rem] border-t border-gray-200 py-[1.6rem]">
          <div className="flex gap-[1rem]">
            {stats.map((item) => (
              <div
                key={item.label}
                className="flex flex-1 flex-col items-center justify-center rounded-[10px] border border-primary-variant px-[0.6rem] py-[1.2rem] text-center"
              >
                <p className="caption1-r font-semibold leading-[150%] text-gray-500">
                  {item.label}
                </p>
                <p className="head3-m mt-[0.2rem] text-primary">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};