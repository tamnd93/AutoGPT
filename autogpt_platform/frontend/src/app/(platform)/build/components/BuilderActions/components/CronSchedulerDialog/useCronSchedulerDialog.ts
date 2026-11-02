import type { ScheduleCreationRequest } from "@/app/api/__generated__/models/scheduleCreationRequest";
import { usePostV1CreateExecutionSchedule } from "@/app/api/__generated__/endpoints/schedules/schedules";
import { useToast } from "@/components/molecules/Toast/use-toast";
import { useUserTimezone } from "@/lib/hooks/useUserTimezone";
import { useLocale } from "@/lib/i18n";
import { getTimezoneDisplayName } from "@/lib/timezone-utils";
import { invalidateAllScheduleQueries } from "@/services/schedules/invalidate-schedules";
import { useQueryClient } from "@tanstack/react-query";
import { parseAsInteger, parseAsString, useQueryStates } from "nuqs";
import { useEffect, useState } from "react";
import { useT } from "@/lib/i18n";

export function useCronSchedulerDialog({
  open,
  setOpen,
  inputs,
  credentials,
  defaultCronExpression = "",
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  inputs: ScheduleCreationRequest["inputs"];
  credentials: ScheduleCreationRequest["credentials"];
  defaultCronExpression?: string;
}) {
  const { toast } = useToast();
  const t = useT();
  const queryClient = useQueryClient();
  const [cronExpression, setCronExpression] = useState<string>("");
  const [scheduleName, setScheduleName] = useState<string>("");
  const [scheduleNameError, setScheduleNameError] = useState<string>("");

  const [{ flowID, flowVersion }] = useQueryStates({
    flowID: parseAsString,
    flowVersion: parseAsInteger,
    flowExecutionID: parseAsString,
  });

  const userTimezone = useUserTimezone();
  const locale = useLocale();
  const timezoneDisplay = getTimezoneDisplayName(userTimezone || "UTC", locale);

  const { mutateAsync: createSchedule, isPending: isCreatingSchedule } =
    usePostV1CreateExecutionSchedule({
      mutation: {
        onSuccess: (response) => {
          if (response.status === 200) {
            setOpen(false);
            toast({
              title: t("build1.cron.created"),
              description: t("build1.cron.createdBody"),
            });
            invalidateAllScheduleQueries(queryClient, flowID ?? undefined);
          }
        },
        onError: (error) => {
          toast({
            variant: "destructive",
            title: t("build1.cron.failed"),
            description:
              (error.detail as string) ?? "An unexpected error occurred.",
          });
        },
      },
    });

  useEffect(() => {
    if (open) {
      setCronExpression(defaultCronExpression);
    }
  }, [open, defaultCronExpression]);

  useEffect(() => {
    if (open) {
      setScheduleName("");
      setScheduleNameError("");
    }
  }, [open]);

  function handleScheduleNameChange(name: string) {
    setScheduleName(name);
    if (name.trim() !== "") {
      setScheduleNameError("");
    }
  }

  async function handleCreateSchedule() {
    if (!scheduleName || scheduleName.trim() === "") {
      setScheduleNameError(t("build1.cron.nameRequiredError"));
      toast({
        variant: "destructive",
        title: t("build1.cron.invalid"),
        description: t("build1.cron.nameRequiredBody"),
      });
      return;
    }

    if (!cronExpression || cronExpression.trim() === "") {
      toast({
        variant: "destructive",
        title: t("build1.cron.invalid"),
        description: t("build1.cron.cronInvalid"),
      });
      return;
    }

    await createSchedule({
      graphId: flowID || "",
      data: {
        name: scheduleName.trim(),
        graph_version: flowID ? flowVersion : undefined,
        cron: cronExpression,
        inputs: inputs,
        credentials: credentials,
      },
    });
  }

  return {
    cronExpression,
    setCronExpression,
    userTimezone,
    timezoneDisplay,
    handleCreateSchedule,
    setScheduleName: handleScheduleNameChange,
    scheduleName,
    scheduleNameError,
    isCreatingSchedule,
  };
}
