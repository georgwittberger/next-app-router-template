import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import type { FC, PropsWithChildren } from "react";

import { PageLayout } from "../_components/page-layout";
import type { LocaleRouteParams } from "../types";

type AuthLocaleLayoutProps = PropsWithChildren<LocaleRouteParams>;

export async function generateMetadata({
  params: { locale },
}: AuthLocaleLayoutProps): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "home" });
  return {
    title: {
      default: t("meta.title"),
      template: `%s | ${t("meta.title")}`,
    },
  };
}

const AuthLocaleLayout: FC<AuthLocaleLayoutProps> = async ({
  children,
  params: { locale },
}) => {
  return (
    <PageLayout locale={locale}>
      <main className="container mx-auto px-4 py-8">{children}</main>
    </PageLayout>
  );
};

export default AuthLocaleLayout;
