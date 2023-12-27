import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import type { FC, PropsWithChildren } from "react";

import "~/globals.css";
import { PageLayout } from "../_components/page-layout";
import type { LocaleRouteParams } from "../types";

type AuthRootLayoutProps = PropsWithChildren<LocaleRouteParams>;

export async function generateMetadata({
  params: { locale },
}: AuthRootLayoutProps): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "home" });
  return {
    title: {
      default: t("meta.title"),
      template: `%s | ${t("meta.title")}`,
    },
  };
}

const AuthRootLayout: FC<AuthRootLayoutProps> = async ({
  children,
  params: { locale },
}) => {
  return (
    <PageLayout locale={locale}>
      <main className="container mx-auto px-4 py-8">{children}</main>
    </PageLayout>
  );
};

export default AuthRootLayout;
