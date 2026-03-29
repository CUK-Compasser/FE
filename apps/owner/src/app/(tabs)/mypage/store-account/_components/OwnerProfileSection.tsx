"use client";

import { Icon } from "@compasser/design-system";

export const OwnerProfileSection = () => {
  return (
    <section className="bg-background px-[1.6rem] py-[3.2rem]">
      <div className="flex items-start">
        <div className="shrink-0">
          <Icon
            name="ProfileCharacter"
            width={80}
            height={80}
            ariaHidden={true}
          />
        </div>

        <div className="ml-[0.8rem] min-w-0 body1-m text-default">
          <p>홍길동</p>
          <p>루키사장</p>
          <p>owner@example.com</p>
        </div>
      </div>
    </section>
  );
};