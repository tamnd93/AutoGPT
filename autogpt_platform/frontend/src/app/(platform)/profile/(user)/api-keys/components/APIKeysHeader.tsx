"use client";

import {
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/atoms/Card/Card";
import { useT } from "@/lib/i18n";

export function APIKeysHeader() {
  const t = useT();
  return (
    <CardHeader>
      <CardTitle>{t("profile1.apiKeys.page.title")}</CardTitle>
      <CardDescription>
        {t("profile1.apiKeys.page.description")}
      </CardDescription>
    </CardHeader>
  );
}
