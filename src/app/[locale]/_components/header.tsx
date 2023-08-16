import clsx from "clsx";
import type { FC, HTMLAttributes } from "react";

import { LanguageSwitcher } from "./language-switcher";
import { UserLogin } from "./user-login";

export const Header: FC<Omit<HTMLAttributes<HTMLElement>, "children">> = ({
  className,
  ...props
}) => {
  return (
    <header
      className={clsx(
        "flex justify-between items-center container mx-auto p-4",
        className
      )}
      {...props}
    >
      <LanguageSwitcher />
      <UserLogin />
    </header>
  );
};
