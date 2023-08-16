import { NextResponse, type NextRequest } from "next/server";

import { signInPagePath } from "~/auth";
import { defaultLocale, getLocale } from "~/i18n";

const signInPagePathPattern = /^\/[^\/\s]+\/auth\/signin/;

export const authI18nMiddleware = (request: NextRequest) => {
  if (!signInPagePathPattern.test(request.nextUrl.pathname)) return;

  const callbackUrl = request.nextUrl.searchParams.get("callbackUrl");
  if (!callbackUrl) return;

  const currentLocale = getLocale(request.nextUrl.pathname) ?? defaultLocale;
  const callbackLocale = getLocale(new URL(callbackUrl).pathname);
  if (callbackLocale && callbackLocale !== currentLocale) {
    const redirectUrl = new URL(request.nextUrl);
    redirectUrl.pathname = signInPagePath(callbackLocale);
    return NextResponse.redirect(redirectUrl);
  }
};
