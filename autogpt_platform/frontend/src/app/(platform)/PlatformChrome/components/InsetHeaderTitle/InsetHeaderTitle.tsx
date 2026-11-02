"use client";

import { Icon } from "@/components/atoms/Icon/Icon";
import { Text } from "@/components/atoms/Text/Text";
import { useT } from "@/lib/i18n";
import type { MessageKey } from "@/lib/i18n/messages/en";
import { usePathname } from "next/navigation";
import { Folder01Icon } from "@hugeicons/core-free-icons";
import type { IconSvgElement } from "@hugeicons/react";

const ROUTE_TITLES: Record<
  string,
  { labelKey: MessageKey; icon: IconSvgElement }
> = {
  "/artifacts": { labelKey: "nav.files", icon: Folder01Icon },
};

export function getRouteTitle(pathname: string | null) {
  if (!pathname) return null;
  const match = Object.entries(ROUTE_TITLES).find(
    ([href]) => pathname === href || pathname.startsWith(`${href}/`),
  );
  return match ? match[1] : null;
}

export function InsetHeaderTitle() {
  const pathname = usePathname();
  const t = useT();
  const entry = getRouteTitle(pathname);

  if (!entry) return null;

  return (
    <div className="flex items-center gap-2">
      <Icon icon={entry.icon} className="size-5 text-zinc-800 max-md:hidden" />
      <Text variant="large-medium">{t(entry.labelKey)}</Text>
    </div>
  );
}
