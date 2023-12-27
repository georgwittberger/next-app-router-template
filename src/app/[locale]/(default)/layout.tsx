import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import type { FC, PropsWithChildren } from "react";

import "~/globals.css";
import { Header } from "../_components/header";
import { PageLayout } from "../_components/page-layout";
import type { LocaleRouteParams } from "../types";

type DefaultRootLayoutProps = PropsWithChildren<LocaleRouteParams>;

export async function generateMetadata({
  params: { locale },
}: DefaultRootLayoutProps): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "home" });
  return {
    title: {
      default: t("meta.title"),
      template: `%s | ${t("meta.title")}`,
    },
  };
}

const DefaultRootLayout: FC<DefaultRootLayoutProps> = ({
  children,
  params: { locale },
}) => {
  return (
    <PageLayout locale={locale} header={<Header className="mb-8" />}>
      <main className="container mx-auto px-4">{children}</main>
    </PageLayout>
  );
};

export default DefaultRootLayout;
