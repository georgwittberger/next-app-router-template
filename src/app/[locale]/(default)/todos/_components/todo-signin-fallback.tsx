import { useTranslations } from "next-intl";
import type { FC } from "react";

import { SigninLink } from "~/components/signin-link";

export const ToDoSigninFallback: FC = () => {
  const t = useTranslations("todos");
  return (
    <div>
      {t.rich("signIn", {
        link: (chunks) => <SigninLink>{chunks}</SigninLink>,
      })}
    </div>
  );
};
