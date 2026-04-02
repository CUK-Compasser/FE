"use client";

import { LOGIN_TEXT } from "../_constants/login.constants";

interface SignupLinkButtonProps {
  onClick: () => void;
}

export default function SignupLinkButton({
  onClick,
}: SignupLinkButtonProps) {
  return (
    <div className="mt-[1.6rem] flex justify-center">
      <button
        type="button"
        onClick={onClick}
        className="body1-m text-gray-700 underline underline-offset-[0.2rem]"
      >
        {LOGIN_TEXT.signupButton}
      </button>
    </div>
  );
}