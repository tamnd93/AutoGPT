import {
  BrainIcon,
  ChartIncreaseIcon,
  CreditCardIcon,
  Key01Icon,
  MessageMultiple01Icon,
  PlugSocketIcon,
  SlidersHorizontalIcon,
  UserIcon,
} from "@hugeicons/core-free-icons";
import type { IconSvgElement } from "@hugeicons/react";
import type { MessageKey } from "@/lib/i18n/messages/en";

export interface SettingsNavItem {
  labelKey: MessageKey;
  href: string;
  Icon: IconSvgElement;
}

export const settingsNavItems: SettingsNavItem[] = [
  {
    labelKey: "account1.nav.profile",
    href: "/settings/profile",
    Icon: UserIcon,
  },
  {
    labelKey: "account1.nav.account",
    href: "/settings/account",
    Icon: SlidersHorizontalIcon,
  },
  {
    labelKey: "account1.nav.memory",
    href: "/settings/memory",
    Icon: BrainIcon,
  },
  {
    labelKey: "account1.nav.billing",
    href: "/settings/billing",
    Icon: CreditCardIcon,
  },
  {
    labelKey: "account1.nav.integrations",
    href: "/settings/integrations",
    Icon: PlugSocketIcon,
  },
  {
    labelKey: "account1.nav.bots",
    href: "/settings/bots",
    Icon: MessageMultiple01Icon,
  },
  {
    labelKey: "account1.nav.apiKeys",
    href: "/settings/api-keys",
    Icon: Key01Icon,
  },
  {
    labelKey: "account1.nav.creator",
    href: "/settings/creator-dashboard",
    Icon: ChartIncreaseIcon,
  },
];
