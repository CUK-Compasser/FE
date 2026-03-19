"use client";

import clsx from "clsx";
import { Icon } from "../../icons";
import type { HeaderProps } from "./Header.types";

const ICON_SIZE = 28;

const shadowClass = "shadow-[0_0.2rem_0.2rem_0_rgba(0,0,0,0.1)]";

export const Header = (props: HeaderProps) => {
  const baseClassName = clsx("relative w-full bg-white", props.className);

  switch (props.variant) {
    case "location-search": {
      const {
        value,
        placeholder = "위치를 입력해주세요",
        onChange,
        onMapPinClick,
        onAlarmClick,
        mapPinIconName = "MapPin",
        alarmIconName = "Alarm",
        inputName,
        inputDisabled = false,
        inputReadOnly = false,
        showShadow = true,
      } = props;

      return (
        <header className={clsx(baseClassName, showShadow && shadowClass)}>
          <div className="flex items-center px-[1rem] py-[1.1rem]">
            <Icon
              name={mapPinIconName} width={ICON_SIZE} height={ICON_SIZE} isInteractive={!!onMapPinClick} onClick={onMapPinClick} ariaHidden={false}
            />

            <div className="ml-[0.4rem] flex-1">
              <input
                name={inputName}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                disabled={inputDisabled}
                readOnly={inputReadOnly}
                className={clsx(
                  "w-full bg-inverse outline-none",
                  "body1-m text-primary placeholder:text-gray-600",
                )}
              />
            </div>

            <Icon
              name={alarmIconName} width={ICON_SIZE} height={ICON_SIZE} isInteractive={!!onAlarmClick} onClick={onAlarmClick} ariaHidden={false}
            />
          </div>
        </header>
      );
    }

    case "back-title": {
      const {
        title,
        onBackClick,
        backIconName = "BackButton",
        showShadow = true,
      } = props;

      return (
        <header className={clsx(baseClassName, showShadow && shadowClass)}>
          <div className="flex items-center px-[1rem] py-[1.1rem]">
            <Icon 
              name={backIconName} width={ICON_SIZE} height={ICON_SIZE} isInteractive={!!onBackClick} onClick={onBackClick} ariaHidden={false} 
            />
            <h1 className="ml-[1rem] head2-sb text-primary">{title}</h1>
          </div>
        </header>
      );
    }

    case "center-title-shadow": {
      const { title, showShadow = true } = props;

      return (
        <header className={clsx(baseClassName, showShadow && shadowClass)}>
          <div className="flex items-center justify-center px-[1rem] py-[1rem]">
            <h1 className="head2-sb text-primary">{title}</h1>
          </div>
        </header>
      );
    }

    case "center-title": {
      const { title, showShadow = false } = props;

      return (
        <header className={clsx(baseClassName, showShadow && shadowClass)}>
          <div className="flex items-center justify-center px-[1rem] py-[1rem]">
            <h1 className="head2-sb text-primary">{title}</h1>
          </div>
        </header>
      );
    }

    case "close-title": {
      const {
        title,
        onCloseClick,
        closeIconName = "CloseButton",
        showShadow = false,
      } = props;

      return (
        <header className={clsx(baseClassName, showShadow && shadowClass)}>
          <div className="relative flex items-center justify-center px-[1rem] py-[1rem]">
            <h1 className="head2-sb text-gray-700">{title}</h1>

            <div className="absolute right-[1rem] top-1/2 -translate-y-1/2">
              <Icon
                name={closeIconName} width={ICON_SIZE} height={ICON_SIZE} isInteractive={!!onCloseClick} onClick={onCloseClick} ariaHidden={false}
              />
            </div>
          </div>
        </header>
      );
    }

    default:
      return null;
  }
};