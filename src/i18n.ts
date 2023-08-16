export const locales = ["en", "de"];
export const defaultLocale = "en";

const localePathPattern = /^\/(?<locale>[^\/\s]+)/;

export const getLocale = (pathname: string) =>
  localePathPattern.exec(pathname)?.groups?.locale;
