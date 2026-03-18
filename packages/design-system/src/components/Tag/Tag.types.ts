import type { ButtonHTMLAttributes, ReactNode } from "react";

export type TagVariant =
  | "pill"
  | "pill-wide"
  | "pill-static"
  | "rounded-rect";

export interface TagProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  children: ReactNode;

  /**
   * 태그 스타일 종류
   * - pill: 기본 선택형 태그
   * - pill-wide: 좌우 패딩이 더 넓은 선택형 태그
   * - pill-static: 선택 변화 없는 고정형 태그
   * - rounded-rect: radius 10의 사각형 태그
   */
  variant?: TagVariant;

  /**
   * 현재 선택 상태
   * 선택형 태그에서만 의미 있음
   */
  selected?: boolean;

  /**
   * 클릭 시 selected 스타일 변화 허용 여부
   * false면 눌러도 스타일 변화 없음
   */
  changeOnClick?: boolean;

  className?: string;
}