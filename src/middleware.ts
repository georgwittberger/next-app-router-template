import type { NextRequest } from "next/server";

import { authI18nMiddleware } from "./server/auth-i18n-middleware";
import { i18nMiddleware } from "./server/i18n-middleware";

export const middleware = (request: NextRequest) => {
  const authI18nResponse = authI18nMiddleware(request);
  if (authI18nResponse) return authI18nResponse;
  const response = i18nMiddleware(request);
  return response;
};

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
