"use client";
import { Button } from "@/components/atoms/Button/Button";
import { Alert, AlertDescription } from "@/components/molecules/Alert/Alert";
import { useT } from "@/lib/i18n";

import { useLowCreditBanner } from "./useLowCreditBanner";
import { Cancel01Icon } from "@hugeicons/core-free-icons";
import { Icon } from "@/components/atoms/Icon/Icon";

interface Props {
  className?: string;
}

export function LowCreditBanner({ className }: Props) {
  const t = useT();
  const { visible, openTopUp, dismiss } = useLowCreditBanner();

  if (!visible) return null;

  const alert = (
    <Alert variant="warning" aria-live="polite">
      <div className="flex flex-wrap items-center gap-3">
        <AlertDescription className="min-w-[12rem] flex-1">
          {t("billing2.lowCredit.body")}
        </AlertDescription>
        <Button variant="primary" size="small" onClick={openTopUp}>
          {t("billing2.lowCredit.topUp")}
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={dismiss}
          aria-label={t("billing2.lowCredit.dismiss")}
          title={t("billing2.lowCredit.dismiss")}
          // TODO(tokens): no exact role for hover:border-[#FFE4BF] (#FFE4BF), hover:bg-[#FFE4BF] (#FFE4BF)
          className="hover:border-[#FFE4BF] hover:bg-[#FFE4BF]"
        >
          <Icon icon={Cancel01Icon} className="h-4 w-4" />
        </Button>
      </div>
    </Alert>
  );

  return className ? <div className={className}>{alert}</div> : alert;
}
