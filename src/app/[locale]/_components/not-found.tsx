import { getTranslations } from "next-intl/server";
import type { FC } from "react";

type NotFoundProps = {
  locale: string;
};

export const NotFound: FC<NotFoundProps> = async ({ locale }) => {
  const t = await getTranslations({ locale, namespace: "notFound" });

  return (
    <html lang={locale}>
      <head>
        <title>{t("meta.title")}</title>
      </head>
      <body className="grid place-content-center min-h-screen">
        <h1 className="text-2xl">{t("heading")}</h1>
      </body>
    </html>
  );
};
