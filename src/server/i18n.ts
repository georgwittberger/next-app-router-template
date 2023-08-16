import { getRequestConfig } from "next-intl/server";
import "server-only";

export default getRequestConfig(async ({ locale }) => ({
  messages: (await import(`../messages/${locale}.json`)).default,
}));
