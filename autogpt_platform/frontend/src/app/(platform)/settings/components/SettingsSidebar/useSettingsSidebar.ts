import { useIsBillingEnabled } from "@/hooks/useIsBillingEnabled";
import { useT } from "@/lib/i18n";
import { usePathname } from "next/navigation";
import { settingsNavItems } from "./helpers";

export function useSettingsSidebar() {
  const t = useT();
  const pathname = usePathname();

  const isBillingEnabled = useIsBillingEnabled();

  const items = settingsNavItems
    .filter((item) => item.href !== "/settings/billing" || isBillingEnabled)
    .map((item) => ({
      ...item,
      label: t(item.labelKey),
      isActive:
        pathname === item.href ||
        (item.href !== "/settings" && pathname.startsWith(`${item.href}/`)),
    }));

  return { items };
}
