import { useLocale } from "next-intl";
import type { FC } from "react";

import { NotFound } from "./_components/not-found";

const NotFoundPage: FC = () => {
  const locale = useLocale();

  return <NotFound locale={locale} />;
};

export default NotFoundPage;
