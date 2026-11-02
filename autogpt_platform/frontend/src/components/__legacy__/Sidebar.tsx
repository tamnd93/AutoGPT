import * as React from "react";
import Link from "next/link";
import { Button } from "./Button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/molecules/Dialog/components/SheetPrimitives";
import { Menu } from "lucide-react";
import { Icon } from "@/components/atoms/Icon/Icon";
import { DashboardLayoutGlyph } from "@/components/atoms/Icon/drawnIcons";
import { useT } from "@/lib/i18n";

export interface SidebarLink {
  text: string;
  href: string;
  icon?: React.ReactNode;
}

export interface SidebarLinkGroup {
  links: SidebarLink[];
}

export interface SidebarProps {
  linkGroups: SidebarLinkGroup[];
}

// Helper function to get the default icon component based on link text
const getDefaultIconForLink = (label: string) => {
  // Default icon
  return (
    <Icon
      icon={DashboardLayoutGlyph}
      aria-label={label}
      strokeWidth={1.25}
      className="h-6 w-6"
    />
  );
};

export const Sidebar: React.FC<SidebarProps> = ({ linkGroups }) => {
  const t = useT();
  // Extract all links from linkGroups
  const allLinks = linkGroups.flatMap((group) => group.links);

  // Function to render link items
  const renderLinks = () => {
    return allLinks.map((link, index) => (
      <Link
        key={`${link.href}-${index}`}
        href={link.href}
        className="inline-flex w-full items-center gap-2.5 rounded-xl px-3 py-3 text-neutral-800 hover:bg-neutral-800 hover:text-white dark:text-neutral-200 dark:hover:bg-neutral-700 dark:hover:text-white"
      >
        {link.icon || getDefaultIconForLink(t("shared1.sidebar.iconAria"))}
        <div className="p-ui-medium text-base font-medium leading-normal">
          {link.text}
        </div>
      </Link>
    ));
  };

  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            aria-label={t("shared1.sidebar.openMenu")}
            className="fixed left-4 top-4 z-50 flex h-14 w-14 items-center justify-center rounded-lg border border-neutral-500 bg-neutral-200 hover:bg-gray-200/50 dark:border-neutral-700 dark:bg-neutral-800 dark:hover:bg-gray-700/50 md:block lg:hidden"
          >
            <Menu className="h-8 w-8 stroke-black dark:stroke-white" />
            <span className="sr-only">{t("shared1.sidebar.openMenu")}</span>
          </Button>
        </SheetTrigger>
        <SheetContent
          side="left"
          className="z-50 w-[280px] border-none p-0 dark:bg-neutral-900 sm:w-[280px]"
        >
          <div className="h-full w-full rounded-2xl bg-zinc-200 dark:bg-zinc-800">
            <div className="inline-flex h-[264px] flex-col items-start justify-start gap-6 p-3">
              {renderLinks()}
            </div>
          </div>
        </SheetContent>
      </Sheet>

      <div className="relative hidden h-[912px] w-[234px] border-none lg:block">
        <div className="h-full w-full rounded-2xl bg-zinc-200 dark:bg-zinc-800">
          <div className="inline-flex h-[264px] flex-col items-start justify-start gap-6 p-3">
            {renderLinks()}
          </div>
        </div>
      </div>
    </>
  );
};
