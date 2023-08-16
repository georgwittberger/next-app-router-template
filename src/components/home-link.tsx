"use client";

import { useTranslations } from "next-intl";
import type { ComponentPropsWithoutRef, FC } from "react";

import { TextLink } from "./text-link";

export const HomeLink: FC<
  Omit<ComponentPropsWithoutRef<typeof TextLink>, "href">
> = ({ className, children, ...props }) => {
  const t = useTranslations("common.home");

  return (
    <TextLink href="/" {...props}>
      {children ?? t("linkText")}
    </TextLink>
  );
};
