"use client";

import { Button } from "@/components/atoms/Button/Button";
import { Text } from "@/components/atoms/Text/Text";
import { Dialog } from "@/components/molecules/Dialog/Dialog";
import { useT } from "@/lib/i18n";

import type { ProviderFailure } from "../../providerFailure";
import { useProviderLimitDialog } from "./useProviderLimitDialog";

interface Props {
  failure: ProviderFailure | null;
  sessionId: string | null;
  onDismiss: () => void;
}

/**
 * A linked subscription stopped accepting turns. Offer to keep going.
 *
 * The PRD's out-of-limit path: the run pauses and offers to continue
 * somewhere else, and never moves the bill on its own. A dialog rather than a
 * toast because the choice has a cost — the rest of this chat spends AutoGPT
 * credits instead of a plan the user already pays for — and that is not a
 * thing to slip past someone in the corner of the screen.
 *
 * Waiting stays a real option. When the provider told us when the limit
 * resets that is said here; an invented time would be worse than none,
 * because people plan around it.
 */
export function ProviderLimitDialog({ failure, sessionId, onDismiss }: Props) {
  const t = useT();
  const {
    alternative,
    continueHere,
    isSwitching,
    resetHint,
    isLoadingOffers,
    failedToLoadOffers,
    retryOffers,
  } = useProviderLimitDialog({ failure, sessionId, onDismiss });

  return (
    <Dialog
      title={t("chatInput2.providerLimit.title")}
      styling={{ maxWidth: "30rem", minWidth: "auto" }}
      controlled={{
        isOpen: Boolean(failure),
        set: (open) => {
          if (!open) onDismiss();
        },
      }}
    >
      <Dialog.Content>
        <Text variant="body" className="text-foreground-secondary">
          {failure?.message?.trim() ||
            t("chatInput2.providerLimit.fallbackBody")}
          {resetHint ? ` ${resetHint}` : ""}
        </Text>

        {isLoadingOffers ? (
          <Text variant="small" className="mt-3 !text-foreground-tertiary">
            {t("chatInput2.providerLimit.checking")}
          </Text>
        ) : failedToLoadOffers ? (
          <>
            <Text variant="small" className="mt-3 !text-foreground-tertiary">
              {t("chatInput2.providerLimit.checkFailed")}
            </Text>
            <Dialog.Footer>
              <Button variant="secondary" onClick={onDismiss}>
                {t("chatInput2.providerLimit.close")}
              </Button>
              <Button variant="primary" onClick={retryOffers}>
                {t("chatInput2.providerLimit.tryAgain")}
              </Button>
            </Dialog.Footer>
          </>
        ) : alternative ? (
          <>
            <Text variant="small" className="mt-3 !text-foreground-tertiary">
              {t("chatInput2.providerLimit.continueBody", {
                name: alternative.display_name,
              })}
            </Text>
            <Dialog.Footer>
              <Button variant="secondary" onClick={onDismiss}>
                {t("chatInput2.providerLimit.wait")}
              </Button>
              <Button
                variant="primary"
                onClick={continueHere}
                loading={isSwitching}
              >
                {t("chatInput2.providerLimit.continueOn", {
                  name: alternative.display_name,
                })}
              </Button>
            </Dialog.Footer>
          </>
        ) : (
          <>
            {/* Nothing to offer: saying so is better than a button that
                cannot do anything. */}
            <Text variant="small" className="mt-3 !text-foreground-tertiary">
              {t("chatInput2.providerLimit.noAlternative")}
            </Text>
            <Dialog.Footer>
              <Button variant="primary" onClick={onDismiss}>
                {t("chatInput2.providerLimit.close")}
              </Button>
            </Dialog.Footer>
          </>
        )}
      </Dialog.Content>
    </Dialog>
  );
}
