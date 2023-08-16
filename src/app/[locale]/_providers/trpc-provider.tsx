"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, type FC, type PropsWithChildren } from "react";
import superjson from "superjson";

import { trpc } from "~/trpc";
import { createLink } from "../../api/trpc/[trpc]/link";

export const TrpcProvider: FC<PropsWithChildren> = ({ children }) => {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({ links: [createLink()], transformer: superjson })
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
};
