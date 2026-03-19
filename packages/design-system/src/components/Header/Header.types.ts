import * as React from "react";
import type { IconName } from "../../icons";

export type HeaderVariant =
  | "location-search"
  | "back-title"
  | "center-title-shadow"
  | "center-title"
  | "close-title";

export interface HeaderBaseProps {
  variant: HeaderVariant;
  className?: string;
  title?: string;
  showShadow?: boolean;
}

export interface LocationSearchHeaderProps extends HeaderBaseProps {
  variant: "location-search";
  value?: string;
  placeholder?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onMapPinClick?: React.MouseEventHandler<SVGSVGElement>;
  onAlarmClick?: React.MouseEventHandler<SVGSVGElement>;
  mapPinIconName?: IconName;
  alarmIconName?: IconName;
  inputName?: string;
  inputDisabled?: boolean;
  inputReadOnly?: boolean;
}

export interface BackTitleHeaderProps extends HeaderBaseProps {
  variant: "back-title";
  title: string;
  onBackClick?: React.MouseEventHandler<SVGSVGElement>;
  backIconName?: IconName;
}

export interface CenterTitleShadowHeaderProps extends HeaderBaseProps {
  variant: "center-title-shadow";
  title: string;
}

export interface CenterTitleHeaderProps extends HeaderBaseProps {
  variant: "center-title";
  title: string;
}

export interface CloseTitleHeaderProps extends HeaderBaseProps {
  variant: "close-title";
  title: string;
  onCloseClick?: React.MouseEventHandler<SVGSVGElement>;
  closeIconName?: IconName;
}

export type HeaderProps =
  | LocationSearchHeaderProps
  | BackTitleHeaderProps
  | CenterTitleShadowHeaderProps
  | CenterTitleHeaderProps
  | CloseTitleHeaderProps;