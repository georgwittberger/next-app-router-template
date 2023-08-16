import type { Metadata } from "next";
import { getTranslator } from "next-intl/server";
import type { FC, PropsWithChildren } from "react";

import "~/globals.css";
import { Header } from "../_components/header";
import { PageLayout } from "../_components/page-layout";
import type { LocaleRouteParams } from "../types";

export async function generateMetadata({
  params,
}: LocaleRouteParams): Promise<Metadata> {
  const t = await getTranslator(params.locale, "home");
  return {
    title: {
      default: t("meta.title"),
      template: `%s | ${t("meta.title")}`,
    },
  };
}

type DefaultRootLayoutProps = PropsWithChildren<LocaleRouteParams>;

const DefaultRootLayout: FC<DefaultRootLayoutProps> = ({ children }) => {
  return (
    <PageLayout header={<Header className="mb-8" />}>
      <main className="container mx-auto px-4">{children}</main>
    </PageLayout>
  );
};

export default DefaultRootLayout;
