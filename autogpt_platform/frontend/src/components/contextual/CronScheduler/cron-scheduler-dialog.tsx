import { useEffect, useState } from "react";
import { BaseInput } from "@/components/atoms/Input/BaseInput";
import { Text } from "@/components/atoms/Text/Text";
import { Button } from "@/components/atoms/Button/Button";
import { useToast } from "@/components/molecules/Toast/use-toast";
import { CronScheduler } from "@/components/contextual/CronScheduler/cron-scheduler";
import { Dialog } from "@/components/molecules/Dialog/Dialog";
import { getTimezoneDisplayName } from "@/lib/timezone-utils";
import { useUserTimezone } from "@/lib/hooks/useUserTimezone";
import { useLocale, useT } from "@/lib/i18n";
import { InfoIcon } from "lucide-react";

// Base type for cron expression only
type CronOnlyCallback = (cronExpression: string) => void;
// Type for cron expression with schedule name
type CronWithNameCallback = (
  cronExpression: string,
  scheduleName: string,
) => void;

type CronSchedulerDialogProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  defaultCronExpression?: string;
  title?: string;
} & (
  | {
      // For cases where only cron expression is needed (builder, submission)
      mode: "cron-only";
      onSubmit: CronOnlyCallback;
    }
  | {
      // For cases where schedule name is required (agent run)
      mode: "with-name";
      onSubmit: CronWithNameCallback;
      defaultScheduleName?: string;
    }
);

export function CronSchedulerDialog(props: CronSchedulerDialogProps) {
  const t = useT();
  const {
    open,
    setOpen,
    defaultCronExpression = "",
    title,
  } = props;

  const { toast } = useToast();
  const [cronExpression, setCronExpression] = useState<string>("");
  const [scheduleName, setScheduleName] = useState<string>(
    props.mode === "with-name" ? props.defaultScheduleName || "" : "",
  );

  // Get user's timezone
  const userTimezone = useUserTimezone();
  const locale = useLocale();
  const timezoneDisplay = getTimezoneDisplayName(userTimezone || "UTC", locale);

  // Reset state when dialog opens
  useEffect(() => {
    if (open) {
      const defaultName =
        props.mode === "with-name" ? props.defaultScheduleName || "" : "";
      setScheduleName(defaultName);
      setCronExpression(defaultCronExpression);
    }
  }, [open, props, defaultCronExpression]);

  const handleDone = () => {
    if (props.mode === "with-name" && !scheduleName.trim()) {
      toast({
        title: t("schedule1.dialog.nameRequired"),
        variant: "destructive",
      });
      return;
    }

    // Validate cron expression before proceeding
    if (!cronExpression || cronExpression.trim() === "") {
      toast({
        variant: "destructive",
        title: t("schedule1.dialog.invalidTitle"),
        description: t("schedule1.dialog.invalidBody"),
      });
      return;
    }

    if (props.mode === "with-name") {
      props.onSubmit(cronExpression, scheduleName);
    } else {
      props.onSubmit(cronExpression);
    }
    setOpen(false);
  };

  return (
    <Dialog
      controlled={{ isOpen: open, set: setOpen }}
      title={title ?? t("schedule1.dialog.defaultTitle")}
      styling={{ maxWidth: "600px" }}
    >
      <Dialog.Content>
        <div className="flex flex-col gap-4">
          {props.mode === "with-name" && (
            <div className="flex max-w-[448px] flex-col space-y-2">
              <Text variant="body-medium-tight" as="label" tone="inherit">
                {t("schedule1.dialog.scheduleName")}
              </Text>
              <BaseInput
                value={scheduleName}
                onChange={(e) => setScheduleName(e.target.value)}
                placeholder={t("schedule1.dialog.namePlaceholder")}
              />
            </div>
          )}

          <CronScheduler
            onCronExpressionChange={setCronExpression}
            initialCronExpression={defaultCronExpression}
            key={`${open}-${defaultCronExpression}`}
          />

          {/* Timezone info */}
          {userTimezone === "not-set" ? (
            <div className="flex items-center gap-2 rounded-md border border-warning-border bg-warning-surface p-3">
              <InfoIcon
                // TODO(tokens): no exact role for text-amber-600 #d97706
                className="h-4 w-4 text-amber-600"
              />
              <Text variant="body-tight" tone="warning-strong">
                {t("schedule1.dialog.noTimezone")}
                <a href="/settings/account" className="ml-1 underline">
                  {t("schedule1.dialog.setTimezone")}
                </a>
              </Text>
            </div>
          ) : (
            <div className="flex items-center gap-2 rounded-md bg-muted/50 p-3">
              <InfoIcon className="h-4 w-4 text-muted-foreground" />
              <Text variant="body-tight" className="text-muted-foreground">
                {t("schedule1.dialog.timezoneLead")}{" "}
                <span className="font-medium">{timezoneDisplay}</span>
              </Text>
            </div>
          )}
        </div>
        <div className="mt-8 flex justify-end space-x-2">
          <Button variant="legacy-outline" onClick={() => setOpen(false)}>
            {t("schedule1.dialog.cancel")}
          </Button>
          <Button variant="legacy-default" onClick={handleDone}>
            {t("schedule1.dialog.done")}
          </Button>
        </div>
      </Dialog.Content>
    </Dialog>
  );
}

// Convenience components for common use cases
export function CronExpressionDialog({
  open,
  setOpen,
  onSubmit,
  defaultCronExpression,
  title,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  onSubmit: (cronExpression: string) => void;
  defaultCronExpression?: string;
  title?: string;
}) {
  const t = useT();
  return (
    <CronSchedulerDialog
      open={open}
      setOpen={setOpen}
      mode="cron-only"
      onSubmit={onSubmit}
      defaultCronExpression={defaultCronExpression}
      title={title ?? t("schedule1.dialog.setScheduleTitle")}
    />
  );
}

export function ScheduleTaskDialog({
  open,
  setOpen,
  onSubmit,
  defaultScheduleName,
  defaultCronExpression,
  title,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  onSubmit: (cronExpression: string, scheduleName: string) => void;
  defaultScheduleName?: string;
  defaultCronExpression?: string;
  title?: string;
}) {
  const t = useT();
  return (
    <CronSchedulerDialog
      open={open}
      setOpen={setOpen}
      mode="with-name"
      onSubmit={onSubmit}
      defaultScheduleName={defaultScheduleName}
      defaultCronExpression={defaultCronExpression}
      title={title ?? t("schedule1.dialog.defaultTitle")}
    />
  );
}
