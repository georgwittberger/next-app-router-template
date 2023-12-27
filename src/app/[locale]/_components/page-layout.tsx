import { getServerSession } from "next-auth";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import type { FC, PropsWithChildren, ReactNode } from "react";

import { getTimeZone } from "~/i18n";
import { authOptions } from "~/server/auth";
import { AuthProvider } from "../_providers/auth-provider";
import { TrpcProvider } from "../_providers/trpc-provider";

type PageLayoutProps = PropsWithChildren<{
  locale: string;
  header?: ReactNode;
}>;

export const PageLayout: FC<PageLayoutProps> = async ({
  children,
  locale,
  header,
}) => {
  const timeZone = getTimeZone(locale);
  const messages = await getMessages({ locale });
  const session = await getServerSession(authOptions);

  return (
    <html lang={locale}>
      <body>
        <AuthProvider session={session}>
          <TrpcProvider>
            <NextIntlClientProvider
              locale={locale}
              timeZone={timeZone}
              messages={messages}
            >
              {header}
              {children}
            </NextIntlClientProvider>
          </TrpcProvider>
        </AuthProvider>
      </body>
    </html>
  );
};
