import type { MessageKey } from "@/lib/i18n";

export enum IconType {
  Marketplace,
  Library,
  Builder,
  Edit,
  LayoutDashboard,
  UploadCloud,
  Settings,
  LogOut,
  AutoGPTLogo,
  Sliders,
  Chat,
  Billing,
  Help,
  WhatsNew,
}

export type MenuItem = {
  icon: IconType;
  /** Catalogue label; every menu row in the product goes through it. */
  labelKey?: MessageKey;
  /** Raw label for a row outside the catalogue (stories and fixtures). */
  text?: string;
  href?: string;
  external?: boolean;
  onClick?: () => void;
};

export type MenuItemGroup = {
  groupName?: string;
  items: MenuItem[];
};

export function getAccountMenuItems(
  userRole?: string,
  isBillingEnabled = true,
): MenuItemGroup[] {
  const footerItems: MenuItem[] = [
    {
      icon: IconType.WhatsNew,
      labelKey: "nav2.menu.whatsNew",
      href: "https://agpt.co/docs/platform/changelog/changelog/",
      external: true,
    },
    {
      icon: IconType.Help,
      labelKey: "nav2.menu.help",
      href: "https://agpt.co/docs",
      external: true,
    },
  ];

  if (userRole === "admin") {
    footerItems.push({
      icon: IconType.Sliders,
      labelKey: "nav2.menu.admin",
      href: "/admin/marketplace",
    });
  }

  footerItems.push({
    icon: IconType.LogOut,
    labelKey: "nav2.menu.logout",
  });

  return [
    {
      items: [
        {
          icon: IconType.Edit,
          labelKey: "nav2.menu.profile",
          href: "/settings/profile",
        },
        {
          icon: IconType.Settings,
          labelKey: "nav2.menu.settings",
          href: "/settings/account",
        },
        ...(isBillingEnabled
          ? [
              {
                icon: IconType.Billing,
                labelKey: "nav2.menu.billing" as const,
                href: "/settings/billing",
              },
            ]
          : []),
      ],
    },
    {
      items: footerItems,
    },
  ];
}
