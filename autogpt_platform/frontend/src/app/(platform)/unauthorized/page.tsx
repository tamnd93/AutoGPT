"use client";

import { useT } from "@/lib/i18n";

export default function Unauthorized() {
  const t = useT();
  return (
    <div>
      <h1>{t("errors1.unauthorized.title")}</h1>
      <p>{t("errors1.unauthorized.body")}</p>
    </div>
  );
}
