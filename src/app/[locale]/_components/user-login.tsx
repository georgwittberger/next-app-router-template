"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { useLocale, useTranslations } from "next-intl";
import type { ButtonHTMLAttributes, FC } from "react";

import { ActionButton } from "~/components/action-button";

export const UserLogin: FC<
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "type" | "onClick">
> = (props) => {
  const locale = useLocale();
  const t = useTranslations("common.userLogin");
  const { data: session } = useSession();

  const handleClick = () => {
    if (session) void signOut({ callbackUrl: `/${locale}` });
    else void signIn();
  };

  return (
    <ActionButton
      type="button"
      variant="small"
      onClick={handleClick}
      {...props}
    >
      {session
        ? t("signOutText", { userName: session.user?.name })
        : t("signInText")}
    </ActionButton>
  );
};
