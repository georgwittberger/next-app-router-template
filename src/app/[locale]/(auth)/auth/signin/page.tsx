import type { Metadata } from "next";
import { getProviders } from "next-auth/react";
import { getTranslations } from "next-intl/server";
import type { FC } from "react";

import type { LocaleRouteParams } from "../../../types";
import { SignInPageContent } from "./_components/signin-page-content";

export async function generateMetadata({
  params: { locale },
}: LocaleRouteParams): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "signIn" });
  return {
    title: t("meta.title"),
    description: t("meta.description"),
  };
}

const SignInPage: FC<LocaleRouteParams> = async () => {
  const providers = await getProviders();
  if (!providers) return null;
  return <SignInPageContent providers={providers} />;
};

export default SignInPage;
