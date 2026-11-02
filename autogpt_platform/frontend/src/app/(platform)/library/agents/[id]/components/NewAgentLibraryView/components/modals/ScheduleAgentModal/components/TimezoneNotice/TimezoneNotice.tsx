import { useUserTimezone } from "@/lib/hooks/useUserTimezone";
import { useLocale, useT } from "@/lib/i18n";
import { getTimezoneDisplayName } from "@/lib/timezone-utils";
import { InformationCircleIcon } from "@hugeicons/core-free-icons";
import { Icon } from "@/components/atoms/Icon/Icon";

export function TimezoneNotice() {
  const userTimezone = useUserTimezone();
  const locale = useLocale();
  const t = useT();

  if (!userTimezone) {
    return null;
  }

  if (userTimezone === "not-set") {
    return (
      <div className="mt-1 flex items-center gap-2 rounded-md border border-warning-border bg-warning-surface p-3">
        <Icon
          // TODO(tokens): no exact role for text-amber-600 (#D97706)
          icon={InformationCircleIcon}
          className="h-4 w-4 text-amber-600"
        />
        <p
          // TODO(tokens): no exact role for text-amber-800 (#92400E)
          className="text-sm text-amber-800"
        >
          {t("library2.timezone.none")}
          <a href="/settings/account" className="ml-1 underline">
            {t("library2.timezone.setLink")}
          </a>
        </p>
      </div>
    );
  }

  const tzName = getTimezoneDisplayName(userTimezone || "UTC", locale);

  return (
    <div className="mt-1 flex items-center gap-2 rounded-md bg-muted/50 p-3">
      <Icon
        icon={InformationCircleIcon}
        className="h-4 w-4 text-muted-foreground"
      />
      <p className="text-sm text-muted-foreground">
        {t("library2.timezone.inYour")}{" "}
        <span className="font-medium">{tzName}</span>
      </p>
    </div>
  );
}
