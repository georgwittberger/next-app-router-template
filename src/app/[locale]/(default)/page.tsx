import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslator } from "next-intl/server";
import type { FC } from "react";

import { TextLink } from "~/components/text-link";
import type { LocaleRouteParams } from "../types";

export async function generateMetadata({
  params,
}: LocaleRouteParams): Promise<Metadata> {
  const t = await getTranslator(params.locale, "home");
  return {
    description: t("meta.description"),
  };
}

const HomePage: FC<LocaleRouteParams> = () => {
  const t = useTranslations("home");

  return (
    <>
      <h1 className="mb-8 text-2xl">{t("heading")}</h1>
      <div>
        <TextLink href="/todos">{t("todos.linkText")}</TextLink>
      </div>
    </>
  );
};

export default HomePage;
