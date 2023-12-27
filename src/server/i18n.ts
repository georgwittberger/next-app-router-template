import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";
import "server-only";

import { getTimeZone, isValidLocale } from "~/i18n";

export default getRequestConfig(async ({ locale }) => {
  if (!isValidLocale(locale)) notFound();

  return {
    messages: (await import(`../messages/${locale}.json`)).default,
    timeZone: getTimeZone(locale),
  };
});
