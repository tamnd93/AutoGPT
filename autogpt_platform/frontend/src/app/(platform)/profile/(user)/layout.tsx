"use client";

import * as React from "react";
import { Sidebar } from "@/components/__legacy__/Sidebar";
import { useGetFlag, Flag } from "@/services/feature-flags/use-get-flag";
import {
  AppWindowIcon,
  Coins01Icon,
  ElectricPlugsIcon,
  Key01Icon,
  SlidersHorizontalIcon,
  Store01Icon,
  UserCircleIcon,
} from "@hugeicons/core-free-icons";
import { Icon } from "@/components/atoms/Icon/Icon";
import { useNewSettingsRedirect } from "./useNewSettingsRedirect";
import { useT } from "@/lib/i18n";

export default function Layout({ children }: { children: React.ReactNode }) {
  const t = useT();
  const isPaymentEnabled = useGetFlag(Flag.ENABLE_PLATFORM_PAYMENT);
  const { isRedirecting } = useNewSettingsRedirect();

  const sidebarLinkGroups = [
    {
      links: [
        {
          text: t("profile2.nav.profile"),
          href: "/profile",
          icon: <Icon icon={UserCircleIcon} className="size-5" />,
        },
        {
          text: t("profile2.nav.creatorDashboard"),
          href: "/profile/dashboard",
          icon: <Icon icon={Store01Icon} className="size-5" />,
        },
        ...(isPaymentEnabled
          ? [
              {
                text: t("profile2.nav.billing"),
                href: "/profile/credits",
                icon: <Icon icon={Coins01Icon} className="size-5" />,
              },
            ]
          : []),
        {
          text: t("profile2.nav.integrations"),
          href: "/profile/integrations",
          icon: <Icon icon={ElectricPlugsIcon} className="size-5" />,
        },
        {
          text: t("profile2.nav.settings"),
          href: "/profile/settings",
          icon: <Icon icon={SlidersHorizontalIcon} className="size-5" />,
        },
        {
          text: t("profile2.nav.apiKeys"),
          href: "/profile/api-keys",
          icon: <Icon icon={Key01Icon} className="size-5" />,
        },
        {
          text: t("profile2.nav.oauthApps"),
          href: "/profile/oauth-apps",
          icon: <Icon icon={AppWindowIcon} className="size-5" />,
        },
      ],
    },
  ];

  // These legacy pages redirect to /settings — render nothing while the
  // replace() is in flight so the old shell never flashes.
  if (isRedirecting) return null;

  return (
    <div className="flex min-h-screen w-full max-w-[1360px] flex-col lg:flex-row">
      <Sidebar linkGroups={sidebarLinkGroups} />
      <div className="flex-1 pl-4">{children}</div>
    </div>
  );
}
