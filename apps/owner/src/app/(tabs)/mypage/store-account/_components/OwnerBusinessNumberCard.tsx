"use client";

import { Card } from "@compasser/design-system";

export const OwnerBusinessNumberCard = () => {
  return (
    <Card variant="gray-200-elevated">
      <div>
        <p className="body1-m text-primary">내 사업자 등록번호</p>

        <div className="mt-[0.8rem] border-t border-gray-200 py-[1rem]">
          <div className="flex items-center justify-between">
            <span className="body2-r text-default">사업자 등록번호</span>
            <span className="body2-r text-gray-600">123-45-67890</span>
          </div>
        </div>
      </div>
    </Card>
  );
};