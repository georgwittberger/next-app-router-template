import { getRequestConfig } from "next-intl/server";
import "server-only";

import { getTimeZone } from "~/i18n";

export default getRequestConfig(async ({ locale }) => ({
  messages: (await import(`../messages/${locale}.json`)).default,
  timeZone: getTimeZone(locale),
}));
