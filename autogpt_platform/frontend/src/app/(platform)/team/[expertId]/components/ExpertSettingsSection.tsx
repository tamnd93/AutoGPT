"use client";

import type { IconSvgElement } from "@hugeicons/react";
import {
  BubbleChatIcon,
  Calendar03Icon,
  Folder01Icon,
  Store01Icon,
  UserRemove01Icon,
  WorkflowSquare01Icon,
} from "@hugeicons/core-free-icons";
import type { ReactNode } from "react";
import { Expert } from "@/app/api/__generated__/models/expert";
import { Button } from "@/components/atoms/Button/Button";
import { Icon } from "@/components/atoms/Icon/Icon";
import { Text } from "@/components/atoms/Text/Text";
import { cn } from "@/lib/utils";
import { useExpertSettingsSection } from "./useExpertSettingsSection";
import { useT } from "@/lib/i18n";

const VISIBLE_PAUSE_NAMES = 4;

interface Props {
  expert: Expert;
  onFire: () => void;
}

/** Firing, spelled out before anyone reaches for the button: what pauses,
 *  what stays, and that the expert can come back. */
export function ExpertSettingsSection({ expert, onFire }: Props) {
  const t = useT();
  const {
    pauseItems,
    isPreviewLoading,
    isPreviewError,
    retryPreview,
    fileCount,
    hasMoreFiles,
  } = useExpertSettingsSection(expert.id);
  const workflowCount = expert.workflows.length;
  const pauseNames = pauseItems.slice(0, VISIBLE_PAUSE_NAMES);
  const hiddenPauseCount = pauseItems.length - pauseNames.length;

  return (
    <section
      aria-label={t("team7.settings.fireAria", { name: expert.name })}
      className="overflow-hidden rounded-2xl bg-surface smooth-shadow-ring-sm"
    >
      <div
        // TODO(tokens): no exact role: border-red-100 #FDECEC
        className="flex items-start gap-3 border-b border-red-100 bg-error-surface/60 px-5 py-4"
      >
        <span
          // TODO(tokens): no exact role: bg-red-100 #FDECEC; no fitting role for text-red-600 #D93636; #D93636 is error-hover (a hover fill)
          className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-red-100 text-red-600"
        >
          <Icon icon={UserRemove01Icon} size={20} aria-hidden />
        </span>
        <div className="min-w-0">
          <Text variant="large-medium" className="!text-foreground-strong">
            {t("team7.settings.fireTitle", { name: expert.name })}
          </Text>
          <Text variant="body-md" className="mt-0.5 !text-foreground-secondary">
            {t("team7.settings.fireBody", { name: expert.name })}
          </Text>
        </div>
      </div>

      <ul className="divide-y divide-separator px-5">
        <Consequence
          icon={Calendar03Icon}
          tone={pauseItems.length > 0 || isPreviewError ? "warn" : "neutral"}
          tag={pauseItems.length > 0 ? t("team7.settings.pausesTag") : undefined}
          title={
            isPreviewLoading
              ? t("team7.settings.checking")
              : isPreviewError
                ? t("team7.settings.checkFailed")
                : pauseItems.length > 0
                  ? t(
                      pauseItems.length === 1
                        ? "team7.settings.automationOne"
                        : "team7.settings.automationMany",
                      { count: pauseItems.length },
                    )
                  : t("team7.settings.noPauses")
          }
        >
          {isPreviewError ? (
            <button
              type="button"
              onClick={() => void retryPreview()}
              className="mt-1 inline-flex text-foreground-body underline underline-offset-2 hover:text-foreground"
            >
              <Text variant="body-md-medium" as="span" tone="inherit">
                {t("team7.settings.retry")}
              </Text>
            </button>
          ) : null}
          {pauseNames.length > 0 ? (
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              {pauseNames.map((item) => (
                <span
                  key={item.id}
                  className="flex min-w-0 max-w-full rounded-full border border-warning-border bg-warning-surface px-2.5 py-0.5"
                >
                  <Text
                    variant="small-tight"
                    as="span"
                    tone="warning-strong"
                    className="truncate"
                  >
                    {item.name}
                  </Text>
                </span>
              ))}
              {hiddenPauseCount > 0 ? (
                <span className="flex px-1 py-0.5">
                  <Text variant="small-tight" as="span" tone="muted">
                    {t("team7.settings.morePauses", {
                      count: hiddenPauseCount,
                    })}
                  </Text>
                </span>
              ) : null}
            </div>
          ) : null}
        </Consequence>
        <Consequence
          icon={WorkflowSquare01Icon}
          tag={t("team7.settings.keptTag")}
          title={
            workflowCount > 0
              ? t(
                  workflowCount === 1
                    ? "team7.settings.workflowOne"
                    : "team7.settings.workflowMany",
                  { count: workflowCount },
                )
              : t("team7.settings.workflowsDefault")
          }
        />
        <Consequence
          icon={Folder01Icon}
          tag={t("team7.settings.keptTag")}
          title={
            fileCount > 0
              ? t(
                  hasMoreFiles
                    ? "team7.settings.fileManyPlus"
                    : fileCount === 1
                      ? "team7.settings.fileOne"
                      : "team7.settings.fileMany",
                  { count: fileCount },
                )
              : t("team7.settings.filesDefault")
          }
        />
        <Consequence
          icon={BubbleChatIcon}
          tag={t("team7.settings.keptTag")}
          title={t("team7.settings.chatHistory")}
        />
        <Consequence
          icon={Store01Icon}
          title={t("team7.settings.hireAgain", { name: expert.name })}
        />
      </ul>

      <div className="flex justify-end border-t border-separator bg-surface-muted/60 px-5 py-3">
        <Button
          variant="destructive"
          size="small"
          textSize="body-md"
          onClick={onFire}
          data-testid="expert-fire-button"
        >
          {t("team7.settings.fireTitle", { name: expert.name })}
        </Button>
      </div>
    </section>
  );
}

interface ConsequenceProps {
  icon: IconSvgElement;
  title: string;
  tag?: string;
  tone?: "neutral" | "warn";
  children?: ReactNode;
}

function Consequence({
  icon,
  title,
  tag,
  tone = "neutral",
  children,
}: ConsequenceProps) {
  const isWarn = tone === "warn";
  return (
    <li className="flex items-start gap-3 py-3">
      <span
        className={cn(
          "flex size-8 shrink-0 items-center justify-center rounded-lg border",
          isWarn
            ? // TODO(tokens): no exact role: text-amber-600 #D97706
              "border-warning-border bg-warning-surface text-amber-600"
            : "border-border-base bg-surface-muted text-foreground-tertiary",
        )}
      >
        <Icon icon={icon} size={15} aria-hidden />
      </span>
      <div className="min-w-0 flex-1 pt-1">
        <div className="flex items-center justify-between gap-3">
          <Text variant="body-md" className="!text-foreground-emphasis">
            {title}
          </Text>
          {tag ? (
            <span
              className={cn(
                "flex shrink-0 rounded-full px-2 py-0.5",
                isWarn
                  ? "bg-warning-surface"
                  : // TODO(tokens): no exact role: bg-emerald-50 #ECFDF5
                    "bg-emerald-50",
              )}
            >
              <Text
                variant="small-medium-tight"
                as="span"
                tone={isWarn ? "warning" : "success-strong"}
              >
                {tag}
              </Text>
            </span>
          ) : null}
        </div>
        {children}
      </div>
    </li>
  );
}
