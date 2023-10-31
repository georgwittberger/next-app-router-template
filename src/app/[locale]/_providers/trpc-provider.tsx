"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  useState,
  type ComponentProps,
  type FC,
  type PropsWithChildren,
} from "react";
import superjson from "superjson";

import { trpc } from "~/trpc";
import { createLink } from "../../api/trpc/[trpc]/link";

type TrpcProviderProps = PropsWithChildren<{
  client?: ComponentProps<typeof trpc.Provider>["client"];
}>;

export const TrpcProvider: FC<TrpcProviderProps> = ({ client, children }) => {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(
    () =>
      client ??
      trpc.createClient({ links: [createLink()], transformer: superjson })
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
};
