"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import type { ButtonHTMLAttributes, FC } from "react";

import { ActionButton } from "~/components/action-button";

export const UserLogin: FC<
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "type" | "onClick">
> = (props) => {
  const t = useTranslations("common.userLogin");
  const { data: session } = useSession();

  const handleClick = () => {
    if (session) signOut({ callbackUrl: "/" });
    else signIn();
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
