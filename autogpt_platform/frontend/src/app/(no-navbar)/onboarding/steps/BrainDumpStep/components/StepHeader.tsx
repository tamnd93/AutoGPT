"use client";

import { RevealItem } from "@/components/atoms/Reveal/Reveal";
import { SwapFade } from "@/components/atoms/SwapFade/SwapFade";
import { Text } from "@/components/atoms/Text/Text";
import { useT } from "@/lib/i18n";
import type { ScreenState } from "../useBrainDumpStep";
import { type Translate } from "../helpers";
import { ElapsedTime } from "./ElapsedTime";
import { OttoMightAsk } from "./OttoMightAsk";

const FAILURE_HEADLINE_KEY = "onboarding1.header.failure";
const TYPING_HEADLINE_KEY = "onboarding1.header.typing";
// "Catch" fits a mishearing, not a typed answer — the typed reject asks
// for more instead of implying the system misheard.
const INSUFFICIENT_HEADLINE_KEYS = {
  voice: "onboarding1.header.insufficientVoice",
  typed: "onboarding1.header.insufficientTyped",
} as const;

interface Props {
  screen: ScreenState;
  restHeadline: string;
  insufficientMode: "voice" | "typed";
  elapsedSeconds: number;
  question: string;
  onTogglePause: () => void;
}

export function StepHeader({
  screen,
  restHeadline,
  insufficientMode,
  elapsedSeconds,
  question,
  onTogglePause,
}: Props) {
  const t = useT();
  const isRecording = screen === "recording";

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col items-center gap-2 px-4 text-center">
      <RevealItem>
        <SwapFade
          swapKey={isRecording ? "timer" : "headline"}
          className="flex min-h-10 items-center justify-center"
        >
          {isRecording ? (
            <ElapsedTime seconds={elapsedSeconds} />
          ) : (
            <Text variant="h3">
              {stateHeadline(screen, restHeadline, insufficientMode, t)}
            </Text>
          )}
        </SwapFade>
      </RevealItem>
      {screen === "rest" && (
        <RevealItem className="flex flex-col items-center gap-4">
          <Text variant="large" tone="muted" className="max-w-xl md:text-lead">
            {t("onboarding1.rest.lead")}{" "}
            <Text variant="body-medium" as="span">
              {t("onboarding1.rest.mid")}
            </Text>{" "}
            {t("onboarding1.rest.tail")}
          </Text>
          {/* On wide screens the ambient cards carry these questions, and
              they are hidden from assistive tech, so this one stays in the
              accessibility tree. */}
          <OttoMightAsk
            question={question}
            compact
            onTogglePause={onTogglePause}
            className="xl:sr-only"
          />
        </RevealItem>
      )}
      {screen === "typing" && (
        <RevealItem>
          <Text variant="body" tone="muted" className="max-w-2xl">
            {t("onboarding1.typing.lead")}{" "}
            <Text variant="body-medium" as="span">
              {t("onboarding1.typing.tail")}
            </Text>
          </Text>
        </RevealItem>
      )}
    </div>
  );
}

function stateHeadline(
  screen: ScreenState,
  restHeadline: string,
  insufficientMode: "voice" | "typed",
  t: Translate,
) {
  if (screen === "failed") return t(FAILURE_HEADLINE_KEY);
  if (screen === "typing") return t(TYPING_HEADLINE_KEY);
  if (screen === "insufficient")
    return t(INSUFFICIENT_HEADLINE_KEYS[insufficientMode]);
  return restHeadline;
}
