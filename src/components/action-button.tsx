"use client";

import clsx from "clsx";
import {
  type ComponentPropsWithoutRef,
  type ComponentRef,
  forwardRef,
} from "react";

type ActionButtonProps = ComponentPropsWithoutRef<"button"> & {
  variant?: "default" | "small";
};

export const ActionButton = forwardRef<
  ComponentRef<"button">,
  ActionButtonProps
>(function ActionButton({ className, variant, children, ...props }, ref) {
  return (
    <button
      ref={ref}
      className={clsx(
        "rounded border disabled:text-gray-400",
        { "px-4 py-2": !variant || variant === "default" },
        { "px-2 py-1 text-sm": variant === "small" },
        { "border-gray-500": !props.disabled },
        { "border-gray-400": props.disabled },
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
});
