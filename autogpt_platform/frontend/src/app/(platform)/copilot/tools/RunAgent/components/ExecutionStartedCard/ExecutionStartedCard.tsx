"use client";

import type { ExecutionStartedResponse } from "@/app/api/__generated__/models/executionStartedResponse";
import { Button } from "@/components/atoms/Button/Button";
import { useLocale, useT } from "@/lib/i18n";
import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n/locale";
import { getMessage } from "@/lib/i18n/translate";
import { executionSharePath } from "@/lib/share/routes";
import { useRouter } from "next/navigation";
import {
  ContentCard,
  ContentCardDescription,
  ContentCardSubtitle,
  ContentCardTitle,
  ContentGrid,
} from "../../../../components/ToolAccordion/AccordionContent";
import { useCopilotChatActions } from "../../../../components/CopilotChatActionsProvider/useCopilotChatActions";

interface Props {
  output: ExecutionStartedResponse;
}

export function titleForStatus(
  status: string | undefined,
  locale: Locale = DEFAULT_LOCALE,
): string {
  // Normalise whatever the backend sent (QUEUED/RUNNING/COMPLETED/FAILED/
  // STOPPED/TERMINATED/TIMED_OUT/INCOMPLETE/CANCELLED …). The card is
  // reused for both truly-just-queued runs and for sync-completed runs
  // (run_agent with wait_for_result) — "Execution started" is wrong for
  // the latter.
  const s = (status ?? "").toUpperCase();
  if (s === "COMPLETED")
    return getMessage(locale, "chatTools4.runAgent.status.completed");
  if (s === "FAILED")
    return getMessage(locale, "chatTools4.runAgent.status.failed");
  if (s === "STOPPED" || s === "TERMINATED" || s === "CANCELLED")
    return getMessage(locale, "chatTools4.runAgent.status.stopped");
  if (s === "TIMED_OUT" || s === "INCOMPLETE")
    return getMessage(locale, "chatTools4.runAgent.status.incomplete");
  if (s === "RUNNING")
    return getMessage(locale, "chatTools4.runAgent.status.running");
  if (s === "SCHEDULED")
    return getMessage(locale, "chatTools4.runAgent.status.scheduled");
  return getMessage(locale, "chatTools4.runAgent.status.started");
}

export function ExecutionStartedCard({ output }: Props) {
  const locale = useLocale();
  const t = useT();
  const router = useRouter();
  // In the builder panel the run_agent effect already drops the exec_id
  // onto the URL so the builder's in-place execution UI opens — the
  // "View Execution" button here would navigate the user away from the
  // page they're editing, so hide it.
  //
  // On the public share viewer, route the CTA to the linked execution's
  // own share page (``/share/{token}``) when a linked share exists.
  // If it doesn't (chat shared without opting in to share this run),
  // hide the button — the auth-gated /library URL is unreachable.
  const { chatSurface, getExecutionShareToken } = useCopilotChatActions();
  const linkedShareToken = getExecutionShareToken?.(output.execution_id);
  const hideViewExecution =
    chatSurface === "builder" || (chatSurface === "share" && !linkedShareToken);

  const href = linkedShareToken
    ? executionSharePath(linkedShareToken)
    : (output.library_agent_link ??
      `/library/agents/${output.graph_id}?activeTab=runs&activeItem=${output.execution_id}`);

  return (
    <ContentGrid>
      <ContentCard>
        <ContentCardTitle>
          {titleForStatus(output.status, locale)}
        </ContentCardTitle>
        <ContentCardSubtitle>{output.execution_id}</ContentCardSubtitle>
        <ContentCardDescription>{output.message}</ContentCardDescription>
        {!hideViewExecution && (
          <Button
            size="small"
            className="mt-3"
            onClick={() => router.push(href)}
          >
            {t("chatTools4.runAgent.card.viewExecution")}
          </Button>
        )}
      </ContentCard>
    </ContentGrid>
  );
}
