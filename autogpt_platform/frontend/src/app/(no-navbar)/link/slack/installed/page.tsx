"use client";

import { Button } from "@/components/atoms/Button/Button";
import { Text } from "@/components/atoms/Text/Text";
import { AuthCard } from "@/components/auth/AuthCard";
import { useSlackInstalledHandoff } from "./useSlackInstalledHandoff";
import { useT } from "@/lib/i18n";

export default function SlackInstalledPage() {
  const t = useT();
  const { openSlackHref, openSlack } = useSlackInstalledHandoff();

  return (
    <div className="flex h-full min-h-[85vh] flex-col items-center justify-center py-10">
      <AuthCard
        title={t("sharing1.slack.title")}
        className="max-w-[38rem] gap-6 p-8"
      >
        <div className="flex w-full flex-col items-center gap-7">
          <div className="w-full rounded-xl bg-muted px-6 py-5 text-center">
            {/* The page navigates on its own, so announce it rather than
                letting a screen reader land somewhere unexplained. */}
            <Text
              variant="body-medium"
              className="text-muted-foreground"
              role="status"
              aria-live="polite"
            >
              {t("sharing1.slack.opening")}
              <br />
              {t("sharing1.slack.returning")}
            </Text>
          </div>

          <div className="flex w-full flex-col items-stretch gap-3 sm:flex-row sm:justify-center sm:gap-4">
            <Button size="small" onClick={openSlack}>
              {t("sharing1.slack.open")}
            </Button>
            <Button
              as="NextLink"
              href={openSlackHref}
              variant="outline"
              size="small"
            >
              {t("sharing1.slack.openBrowser")}
            </Button>
          </div>
        </div>
      </AuthCard>
    </div>
  );
}
