"use client";

import { Input, Button } from "@compasser/design-system";
import type { LoginReqDTO } from "@compasser/api";
import { LOGIN_TEXT } from "../_constants/login.constants";

interface LoginFormProps {
  values: LoginReqDTO;
  isPending: boolean;
  onChangeEmail: (value: string) => void;
  onChangePassword: (value: string) => void;
  onSubmit: () => void;
}

export default function LoginForm({
  values,
  isPending,
  onChangeEmail,
  onChangePassword,
  onSubmit,
}: LoginFormProps) {
  return (
    <>
      <div className="w-full">
        <p className="body2-m pb-[0.2rem] text-default">
          {LOGIN_TEXT.emailLabel}
        </p>
        <Input
          type="email"
          placeholder={LOGIN_TEXT.emailPlaceholder}
          value={values.email}
          onChange={(e) => onChangeEmail(e.target.value)}
        />
      </div>

      <div className="mt-[2rem] mb-[5.2rem] w-full">
        <p className="body2-m pb-[0.2rem] text-default">
          {LOGIN_TEXT.passwordLabel}
        </p>
        <Input
          type="password"
          placeholder={LOGIN_TEXT.passwordPlaceholder}
          value={values.password}
          onChange={(e) => onChangePassword(e.target.value)}
        />
      </div>

      <div className="w-full">
        <Button
          type="button"
          size="lg"
          kind="default"
          variant="primary"
          onClick={onSubmit}
          disabled={isPending}
        >
          {isPending
            ? LOGIN_TEXT.loginPendingButton
            : LOGIN_TEXT.loginButton}
        </Button>
      </div>
    </>
  );
}