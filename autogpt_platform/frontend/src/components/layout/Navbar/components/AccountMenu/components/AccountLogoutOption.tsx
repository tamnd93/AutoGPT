"use client";
import { useRouter } from "next/navigation";
import { AccountMenuRow } from "./AccountMenuRow";
import { Logout03Icon } from "@hugeicons/core-free-icons";
import { Icon } from "@/components/atoms/Icon/Icon";
import { useT } from "@/lib/i18n";

export function AccountLogoutOption() {
  const t = useT();
  const router = useRouter();

  function handleLogout() {
    router.replace("/logout");
  }

  return (
    <AccountMenuRow
      as="button"
      destructive
      label={t("nav2.menu.logout")}
      icon={<Icon icon={Logout03Icon} className="h-[18px] w-[18px] shrink-0" />}
      onClick={handleLogout}
    />
  );
}
