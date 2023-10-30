import createIntlMiddleware from "next-intl/middleware";

import { defaultLocale, locales } from "~/i18n";
import { pathnames } from "~/navigation";

export const i18nMiddleware = createIntlMiddleware({
  locales,
  defaultLocale,
  pathnames,
});
