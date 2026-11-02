import { Button } from "@/components/atoms/Button/Button";
import { UsageMeters } from "@/components/organisms/UsageExperience/UsageMeters";
import { useLocale } from "@/lib/i18n";
import { sendAtResetLabel } from "../../SendAtReset/helpers";

interface Reading {
  percent_used: number;
}

interface Props {
  meters?: { daily?: Reading | null; weekly?: Reading | null } | null;
  onSendAtReset?: () => void;
  isScheduling?: boolean;
}

export function ResetWaitBox({ meters, onSendAtReset, isScheduling }: Props) {
  const locale = useLocale();

  return (
    <div className="mb-5 space-y-4 rounded-xl border border-border-base bg-surface-muted p-4">
      <UsageMeters daily={meters?.daily} weekly={meters?.weekly} />
      {onSendAtReset && (
        <Button
          size="small"
          className="w-full"
          onClick={onSendAtReset}
          loading={isScheduling}
        >
          {sendAtResetLabel(locale)}
        </Button>
      )}
    </div>
  );
}
