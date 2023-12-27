export const locales = ["en", "de"] as const;
export const defaultLocale = "en";

const localePathPattern = /^\/(?<locale>[^\/\s]+)/;

export const getLocale = (pathname: string) =>
  localePathPattern.exec(pathname)?.groups?.locale;

export const isValidLocale = (
  locale: string,
): locale is (typeof locales)[number] =>
  locales.includes(locale as (typeof locales)[number]);

export const getTimeZone = (_locale: string) => "Europe/Berlin";
