"use client";

import type { PausedScheduledChat } from "@/app/api/__generated__/models/pausedScheduledChat";
import { Button } from "@/components/atoms/Button/Button";
import { Icon } from "@/components/atoms/Icon/Icon";
import { Text } from "@/components/atoms/Text/Text";
import { Dialog } from "@/components/molecules/Dialog/Dialog";
import { useT } from "@/lib/i18n";
import { Delete02Icon, PauseIcon, PlayIcon } from "@hugeicons/core-free-icons";
import Link from "next/link";
import { usePausedChatListItem } from "./usePausedChatListItem";

interface Props {
  paused: PausedScheduledChat;
}

export function PausedChatListItem({ paused }: Props) {
  const t = useT();
  const {
    sessionHref,
    handleResume,
    isResuming,
    canDelete,
    isDeleteOpen,
    setIsDeleteOpen,
    handleDelete,
    isDeleting,
  } = usePausedChatListItem({ paused });

  const detail = (
    <>
      <div
        // TODO(tokens): no exact role for border-slate-50 #F7F8F9
        className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-large border border-slate-50 bg-warning-surface"
      >
        <Icon icon={PauseIcon} size={18} className="text-warning-foreground" />
      </div>
      <div className="flex min-w-0 flex-col gap-1">
        <Text
          variant="body-medium"
          className="block w-full truncate text-ellipsis"
        >
          {paused.title}
        </Text>
        <Text variant="small" className="!text-warning-foreground">
          {paused.summary}
        </Text>
      </div>
    </>
  );

  return (
    <div
      className="flex w-full flex-col gap-3 rounded-large border border-warning-border bg-surface p-4 sm:flex-row sm:items-center sm:justify-between"
      data-testid="paused-chat-row"
      data-schedule-key={paused.schedule_key}
    >
      {sessionHref ? (
        <Link
          href={sessionHref}
          className="flex min-w-0 flex-1 items-start gap-3 hover:opacity-80"
        >
          {detail}
        </Link>
      ) : (
        <div className="flex min-w-0 flex-1 items-start gap-3">{detail}</div>
      )}
      <div className="flex flex-shrink-0 items-center gap-2">
        <Button
          variant="secondary"
          size="small"
          loading={isResuming}
          onClick={handleResume}
          aria-label={t("schedule1.paused.resumeAria", {
            title: paused.title,
          })}
        >
          <Icon icon={PlayIcon} className="mr-1 h-4 w-4" />
          {t("schedule1.paused.resume")}
        </Button>
        {canDelete ? (
          <Button
            variant="secondary"
            size="small"
            onClick={() => setIsDeleteOpen(true)}
            aria-label={t("schedule1.paused.deleteAria", {
              title: paused.title,
            })}
          >
            <Icon icon={Delete02Icon} className="mr-1 h-4 w-4" />
            {t("schedule1.paused.delete")}
          </Button>
        ) : null}
      </div>

      <Dialog
        controlled={{ isOpen: isDeleteOpen, set: setIsDeleteOpen }}
        styling={{ maxWidth: "32rem" }}
        title={t("schedule1.paused.deleteTitle")}
      >
        <Dialog.Content>
          <div className="flex flex-col gap-4">
            <Text variant="large">
              {t("schedule1.paused.deleteBody", { title: paused.title })}
            </Text>
            <Dialog.Footer>
              <Button
                variant="secondary"
                disabled={isDeleting}
                onClick={() => setIsDeleteOpen(false)}
              >
                {t("schedule1.paused.keep")}
              </Button>
              <Button
                variant="destructive"
                onClick={handleDelete}
                loading={isDeleting}
              >
                {t("schedule1.paused.confirmDelete")}
              </Button>
            </Dialog.Footer>
          </div>
        </Dialog.Content>
      </Dialog>
    </div>
  );
}
