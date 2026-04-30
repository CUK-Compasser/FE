"use client";

import { Icon } from "@compasser/design-system";
import { LOGIN_TEXT } from "../_constants/login.constants";

export default function KakaoLoginButton() {
  const handleKakaoLogin = () => {
    const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

    if (!baseURL) {
      console.log("NEXT_PUBLIC_API_BASE_URL이 없습니다.");
      return;
    }

    window.location.href = `${baseURL}/oauth2/authorization/kakao`;
  };

  return (
    <button
      type="button"
      onClick={handleKakaoLogin}
      aria-label={LOGIN_TEXT.kakaoLoginButton}
      className="relative flex w-full items-center justify-center rounded-[8px] bg-[#FEE500] px-[1.2rem] py-[1rem]"
    >
      <div className="absolute left-[1.4rem] top-1/2 -translate-y-1/2">
        <Icon name="KakaoLogo" width={23} height={23} ariaHidden={true} />
      </div>

      <span className="head3-m text-[#191919]">
        {LOGIN_TEXT.kakaoLoginButton}
      </span>
    </button>
  );
}