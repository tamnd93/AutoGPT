"use client";

import { AlertTriangleIcon } from "lucide-react";
import Link from "next/link";

import { Text } from "@/components/atoms/Text/Text";
import { Dialog } from "@/components/molecules/Dialog/Dialog";
import { useT } from "@/lib/i18n";

import { TopUpForm } from "../TopUpForm/TopUpForm";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  // "out-of-credits" is the reactive nudge shown when the balance hits zero;
  // "add-credits" is the same form opened deliberately from the wallet.
  variant?: "out-of-credits" | "add-credits";
}

export function TopUpDialog({
  isOpen,
  onClose,
  variant = "out-of-credits",
}: Props) {
  const t = useT();
  const isOutOfCredits = variant === "out-of-credits";

  function handleOpenChange(open: boolean) {
    if (!open) onClose();
  }

  return (
    <Dialog
      title={
        isOutOfCredits ? (
          <span className="inline-flex items-center gap-2">
            <AlertTriangleIcon
              // TODO(tokens): no exact role for text-orange-600 (#E77B00)
              className="h-[1.125rem] w-[1.125rem] text-orange-600"
            />
            {t("billing2.topUp.outOfCreditsTitle")}
          </span>
        ) : (
          t("billing2.topUp.addCreditsTitle")
        )
      }
      styling={{ maxWidth: "28rem" }}
      controlled={{ isOpen, set: handleOpenChange }}
    >
      <Dialog.Content>
        <Text variant="large">
          {isOutOfCredits
            ? t("billing2.topUp.outOfCreditsBody")
            : t("billing2.topUp.addCreditsBody")}
          <Link href="/settings/billing" className="underline">
            {t("billing2.topUp.autoRefillLink")}
          </Link>
          .
        </Text>
        <TopUpForm submitLabel={t("billing2.topUp.submit")} />
      </Dialog.Content>
    </Dialog>
  );
}
