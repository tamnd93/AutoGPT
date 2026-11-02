"use client";

import { Button } from "@/components/atoms/Button/Button";
import { useT } from "@/lib/i18n";

export function TeamHeaderActions() {
  const t = useT();
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button as="NextLink" href="/raise" variant="secondary" size="small">
        {t("team9.header.createExpert")}
      </Button>
      <Button
        as="NextLink"
        href="/marketplace#experts"
        variant="primary"
        size="small"
      >
        {t("team9.header.hireExpert")}
      </Button>
    </div>
  );
}
