"use client";

import React from "react";
import { Dialog } from "@/components/molecules/Dialog/Dialog";
import { Button } from "@/components/atoms/Button/Button";
import { Input } from "@/components/atoms/Input/Input";
import { MultiToggle } from "@/components/molecules/MultiToggle/MultiToggle";
import { Select } from "@/components/atoms/Select/Select";
import { Text } from "@/components/atoms/Text/Text";
import { GraphExecutionJobInfo } from "@/app/api/__generated__/models/graphExecutionJobInfo";
import { useEditScheduleModal } from "./useEditScheduleModal";
import { PencilEdit02Icon } from "@hugeicons/core-free-icons";
import { Icon } from "@/components/atoms/Icon/Icon";
import { useT } from "@/lib/i18n";

type Props = {
  graphId: string;
  schedule: GraphExecutionJobInfo;
  triggerClassName?: string;
  iconOnly?: boolean;
};

export function EditScheduleModal({
  graphId,
  schedule,
  triggerClassName,
  iconOnly = false,
}: Props) {
  const t = useT();
  const {
    isOpen,
    setIsOpen,
    name,
    setName,
    canEditTiming,
    recurrenceLabel,
    repeat,
    setRepeat,
    selectedDays,
    setSelectedDays,
    time,
    setTime,
    errors,
    repeatOptions,
    dayItems,
    handleSave,
    isPending,
  } = useEditScheduleModal(graphId, schedule);

  return (
    <Dialog
      title={t("library2.editSchedule.title")}
      controlled={{ isOpen, set: setIsOpen }}
      styling={{ maxWidth: "22rem" }}
    >
      <Dialog.Trigger>
        {iconOnly ? (
          <Button
            variant="icon"
            size="icon"
            aria-label={t("library2.editSchedule.editButton")}
          >
            <Icon
              icon={PencilEdit02Icon}
              size={18}
              className="text-foreground-body"
            />
          </Button>
        ) : (
          <Button
            variant="ghost"
            size="small"
            className={triggerClassName ?? "absolute -right-2 -top-2"}
          >
            <Icon icon={PencilEdit02Icon} className="size-4" />{" "}
            {t("library2.editSchedule.editButton")}
          </Button>
        )}
      </Dialog.Trigger>
      <Dialog.Content>
        <div className="flex flex-col gap-6">
          <Input
            id="schedule-name"
            label={t("library2.editSchedule.name")}
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={errors.scheduleName}
          />
          {canEditTiming ? (
            <>
              <Select
                id="repeat"
                label={t("library2.editSchedule.repeats")}
                value={repeat}
                onValueChange={setRepeat}
                options={repeatOptions}
              />
              {repeat === "weekly" && (
                <div className="flex flex-col gap-1">
                  <MultiToggle
                    items={dayItems}
                    selectedValues={selectedDays}
                    onChange={setSelectedDays}
                    aria-label={t("library2.editSchedule.selectDays")}
                  />
                  {errors.days && (
                    <Text variant="small" tone="danger">
                      {errors.days}
                    </Text>
                  )}
                </div>
              )}
              <Input
                id="schedule-time"
                label={t("library2.editSchedule.at")}
                value={time}
                onChange={(e) => setTime(e.target.value.trim())}
                placeholder="00:00"
                error={errors.time}
              />
            </>
          ) : (
            <Text variant="body" tone="muted">
              {t("library2.editSchedule.timingLocked", {
                recurrence: recurrenceLabel.toLowerCase(),
              })}
            </Text>
          )}
        </div>
        <Dialog.Footer>
          <div className="flex w-full justify-end gap-2">
            <Button
              variant="secondary"
              size="small"
              onClick={() => setIsOpen(false)}
              className="min-w-32"
            >
              {t("library2.common.cancel")}
            </Button>
            <Button
              variant="primary"
              size="small"
              onClick={handleSave}
              loading={isPending}
              className="min-w-32"
            >
              {isPending
                ? t("library2.editSchedule.saving")
                : t("library2.editSchedule.save")}
            </Button>
          </div>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog>
  );
}
