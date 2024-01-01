import { render, type RenderOptions } from "@testing-library/react";
import { httpLink } from "@trpc/react-query";
import type { Session } from "next-auth";
import { NextIntlClientProvider } from "next-intl";
import { FC, PropsWithChildren, ReactElement, Suspense } from "react";
import superjson from "superjson";

import { AuthProvider } from "~/app/[locale]/_providers/auth-provider";
import { TrpcProvider } from "~/app/[locale]/_providers/trpc-provider";
import { getTimeZone } from "~/i18n";
import messages from "~/messages/en.json";
import { trpc } from "~/trpc";
import { serverTrpcUrl } from "./server";

export const testLocale = "en";

type CustomRenderOptions = {
  session?: Session | null;
};

const createWrapper = (options?: CustomRenderOptions): FC<PropsWithChildren> =>
  function Wrapper({ children }) {
    const session = options?.session ?? null;
    const trpcClient = trpc.createClient({
      links: [httpLink({ url: serverTrpcUrl })],
      transformer: superjson,
    });
    return (
      <Suspense>
        <AuthProvider session={session}>
          <TrpcProvider client={trpcClient}>
            <NextIntlClientProvider
              locale={testLocale}
              timeZone={getTimeZone(testLocale)}
              messages={messages}
            >
              {children}
            </NextIntlClientProvider>
          </TrpcProvider>
        </AuthProvider>
      </Suspense>
    );
  };

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper"> & CustomRenderOptions,
) => render(ui, { wrapper: createWrapper(options), ...options });

export * from "@testing-library/react";
export { customRender as render };
