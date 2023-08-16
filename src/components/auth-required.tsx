"use client";

import { useSession } from "next-auth/react";
import type { FC, PropsWithChildren, ReactNode } from "react";

type AuthRequiredProps = PropsWithChildren<{ fallback?: ReactNode }>;

export const AuthRequired: FC<AuthRequiredProps> = ({ fallback, children }) => {
  const { data: session } = useSession();
  if (!session) return fallback;
  return children;
};
