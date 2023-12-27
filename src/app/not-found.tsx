import type { FC } from "react";

import { defaultLocale } from "~/i18n";
import { NotFound } from "./[locale]/_components/not-found";

const NotFoundPage: FC = () => {
  return <NotFound locale={defaultLocale} />;
};

export default NotFoundPage;
