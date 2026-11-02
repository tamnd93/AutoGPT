import type { TrialRejectionReason } from "@/app/api/__generated__/models/trialRejectionReason";
import { Button } from "@/components/atoms/Button/Button";
import { Text } from "@/components/atoms/Text/Text";
import { TrialTitle } from "./TrialTitle/TrialTitle";
import { useT } from "@/lib/i18n";

interface Props {
  reason: TrialRejectionReason;
}

export function TrialRejection({ reason }: Props) {
  const t = useT();
  const alreadyUsed = reason === "intro_offer_already_used";
  return (
    <div role="status" data-slot="trial-rejection" className="flex flex-col gap-3">
      <TrialTitle>
        {alreadyUsed
          ? t("billing3.rejection.usedTitle")
          : t("billing3.rejection.verifyTitle")}
      </TrialTitle>
      <Text variant="body" className="!text-foreground-emphasis">
        {alreadyUsed
          ? t("billing3.rejection.usedBody")
          : t("billing3.rejection.verifyBody")}
      </Text>
      <Text variant="body" className="!text-foreground-emphasis">
        {t("billing3.rejection.footnote")}
      </Text>
      <Button
        as="NextLink"
        href="https://discord.gg/autogpt"
        target="_blank"
        rel="noopener noreferrer"
        variant="outline"
        size="small"
        className="self-start"
      >
        {t("billing3.rejection.contactSupport")}
      </Button>
    </div>
  );
}
