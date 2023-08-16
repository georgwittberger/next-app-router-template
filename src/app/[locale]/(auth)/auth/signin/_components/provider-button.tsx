"use client";

import { signIn, type ClientSafeProvider } from "next-auth/react";
import { useLocale, useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import type { FC } from "react";

import { ActionButton } from "~/components/action-button";

type ProviderButtonProps = {
  provider: ClientSafeProvider;
};

export const ProviderButton: FC<ProviderButtonProps> = ({ provider }) => {
  const t = useTranslations("signIn");
  const locale = useLocale();
  const searchParams = useSearchParams();

  const handleClick = () => {
    signIn(provider.id, {
      callbackUrl: searchParams.get("callbackUrl") || `/${locale}`,
    });
  };

  return (
    <ActionButton type="button" onClick={handleClick}>
      {t("providerButtonText", { name: provider.name })}
    </ActionButton>
  );
};
