"use client";

import { Badge } from "@/components/atoms/Badge/Badge";
import { Button } from "@/components/atoms/Button/Button";
import { Text } from "@/components/atoms/Text/Text";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/molecules/Popover/Popover";
import { useT } from "@/lib/i18n";
import Link from "next/link";
import type { ReactNode } from "react";
import { formatTierLabel, TIER_BADGE_CLASS_NAME } from "../../usageHelpers";
import { UsageMeter } from "@/components/organisms/UsageExperience/UsageMeter";
import { formatUsageDate } from "@/services/usageExperience/helpers";
import { StorageBar } from "../StorageBar";
import { UsageBar } from "../UsageBar";
import { useUsagePopover } from "./useUsagePopover";
import { GaugeIcon } from "@hugeicons/core-free-icons";
import { Icon } from "@/components/atoms/Icon/Icon";

interface Props {
  trigger?: ReactNode;
  align?: "start" | "center" | "end";
}

export function UsagePopover({ trigger, align = "start" }: Props) {
  const t = useT();
  const { usage, experience, isLoading, isError, retry, isBillingEnabled } =
    useUsagePopover();

  if (isLoading) return null;
  if (!isError && !usage?.daily && !usage?.weekly && !experience.isActiveTrial)
    return null;

  const tierLabel = formatTierLabel(experience.tier);

  return (
    <Popover>
      <PopoverTrigger asChild>
        {trigger ?? (
          <Button
            variant="ghost"
            size="icon"
            aria-label={t("chatInput3.popover.title")}
          >
            <Icon icon={GaugeIcon} className="!size-5" />
          </Button>
        )}
      </PopoverTrigger>
      {/* z-[80]: must layer above the mobile sidebar sheet so the popover
          doesn't render under its overlay. */}
      <PopoverContent align={align} className="z-[80] w-72 p-4">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <Text
              // TODO(tokens): no exact role for text-neutral-800
              variant="body-medium"
              className="text-neutral-800"
            >
              {t("chatInput3.popover.title")}
            </Text>
            {tierLabel && (
              <Badge
                variant="info"
                size="small"
                className={TIER_BADGE_CLASS_NAME}
              >
                {tierLabel}
              </Badge>
            )}
          </div>
          {isError && (
            <div>
              <Text variant="small">
                {t("chatInput3.card.unavailableTitle")}
              </Text>
              <Button size="small" variant="ghost" onClick={() => void retry()}>
                {t("chatInput3.card.tryAgain")}
              </Button>
            </div>
          )}
          {!isError &&
            experience.isActiveTrial &&
            experience.trialPercent !== null && (
              <UsageMeter
                label={t("chatInput3.window.trial")}
                percent={experience.trialPercent}
                detail={
                  experience.trialEndsAt
                    ? t("chatInput3.popover.trialEnds", {
                        date: formatUsageDate(experience.trialEndsAt),
                      })
                    : t("chatInput3.popover.trialNoEnd")
                }
              />
            )}
          {!isError && !experience.isLifetimeTrial && usage?.daily && (
            <UsageBar
              label={t("chatInput3.window.today")}
              percentUsed={usage.daily.percent_used}
              resetsAt={usage.daily.resets_at}
            />
          )}
          {!isError && !experience.isLifetimeTrial && usage?.weekly && (
            <UsageBar
              label={t("chatInput3.window.week")}
              percentUsed={usage.weekly.percent_used}
              resetsAt={usage.weekly.resets_at}
            />
          )}
          <StorageBar />
          {isBillingEnabled && (
            <Link
              href="/settings/billing"
              className="text-sm text-info-foreground hover:underline"
            >
              {t("chatInput3.popover.manageBilling")}
            </Link>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
