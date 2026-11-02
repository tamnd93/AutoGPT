import { useCreateRaisedExpert } from "@/app/api/__generated__/endpoints/experts/experts";
import type { RaiseResult } from "@/app/api/__generated__/models/raiseResult";
import { toast } from "@/components/molecules/Toast/use-toast";
import { useT } from "@/lib/i18n";
import { ApiError } from "@/lib/autogpt-server-api/helpers";
import { invalidateExpertRosterQueries } from "@/services/experts/invalidate-experts";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { roleFor } from "./components/CategoryStep/helpers";
import {
  failedAttachmentMessage,
  toRaiseAttachments,
} from "./components/KitStep/helpers";
import {
  clearDraft,
  getExpertLimitCode,
  type RaiseDraft,
  type RaiseKit,
} from "./helpers";

export function useRaiseSubmission() {
  const t = useT();
  const queryClient = useQueryClient();
  const router = useRouter();
  const { mutateAsync: createRaisedExpert, isPending } =
    useCreateRaisedExpert();
  // The latch survives re-renders so a double click cannot fire two POSTs
  // before `isPending` has flipped; it is released again on failure so the
  // user can retry.
  const submitLatch = useRef(false);
  const [isLocked, setIsLocked] = useState(false);

  async function finish(draft: RaiseDraft, kit: RaiseKit) {
    if (submitLatch.current) return;
    submitLatch.current = true;
    setIsLocked(true);
    try {
      const response = await createRaisedExpert({
        data: {
          name: draft.name,
          role: draft.legacyRole ?? roleFor(draft.category),
          job_title: draft.jobTitle || null,
          color: draft.color,
          avatar_url: draft.avatarUrl || null,
          about: draft.about || null,
          voice_preferences: draft.voicePreferences || null,
          weekly_budget: kit.weeklyBudget,
          attachments: toRaiseAttachments(kit.attachments),
        },
      });
      const result = response.data as RaiseResult;
      if (result.failed_attachments?.length) {
        toast({
          title: t("team5.raise.partialTitle", {
            name: draft.name || t("team5.raise.defaultName"),
          }),
          description: failedAttachmentMessage(
            result.failed_attachments,
            kit.attachments,
          ),
        });
      }
      clearDraft();
      // The copilot page only fires the kickoff for an expert it finds in the
      // roster, and the sidebar keeps that roster cached, so refresh it before
      // handing over or the new expert is treated as unknown and the kickoff
      // param is dropped.
      await invalidateExpertRosterQueries(queryClient);
      // kickoff=1 has the expert open the thread itself: introduce who it is,
      // say what it can take on, and start or ask for its first job.
      router.push(
        `/copilot?expertId=${encodeURIComponent(result.expert.id)}&kickoff=1`,
      );
    } catch (error) {
      submitLatch.current = false;
      setIsLocked(false);
      reportFailure(error, draft.name, t);
    }
  }

  return { finish, isSubmitting: isPending || isLocked };
}

type Translate = ReturnType<typeof useT>;

function reportFailure(error: unknown, name: string, t: Translate) {
  if (error instanceof ApiError && error.status === 409) {
    if (getExpertLimitCode(error.response) === "raised_expert_lifetime_limit") {
      toast({
        title: t("team5.raise.limitTitle"),
        description: t("team5.raise.limitBody"),
        variant: "destructive",
      });
      return;
    }
    toast({
      title: t("team5.raise.teamFullTitle"),
      description: t("team5.raise.teamFullBody"),
      variant: "destructive",
    });
    return;
  }
  toast({
    title: t("team5.raise.createFailed", {
      name: name || t("team5.raise.defaultName"),
    }),
    description:
      error instanceof ApiError && [400, 422, 503].includes(error.status)
        ? error.message
        : t("team5.raise.genericError"),
    variant: "destructive",
  });
}
