"use client";

import clsx from "clsx";
import {
  type ComponentPropsWithoutRef,
  type ComponentRef,
  forwardRef,
} from "react";

import { Link } from "~/navigation";

export const TextLink = forwardRef<
  ComponentRef<typeof Link>,
  ComponentPropsWithoutRef<typeof Link>
>(function TextLink({ className, children, ...props }, ref) {
  return (
    <Link
      ref={ref}
      className={clsx("text-blue-600 hover:underline", className)}
      {...props}
    >
      {children}
    </Link>
  );
});
