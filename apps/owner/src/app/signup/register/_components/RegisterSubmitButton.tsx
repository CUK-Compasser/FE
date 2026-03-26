"use client";

import { Button } from "@compasser/design-system";

interface RegisterSubmitButtonProps {
  onClick: () => void;
}

export default function RegisterSubmitButton({
  onClick,
}: RegisterSubmitButtonProps) {
  return (
    <div className="shrink-0 px-[1.6rem] py-[1.6rem]">
      <Button
        type="button"
        size="lg"
        kind="default"
        variant="primary"
        onClick={onClick}
      >
        등록 완료
      </Button>
    </div>
  );
}