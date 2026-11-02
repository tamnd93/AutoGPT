"use client";

import type { SetupRequirementsResponse } from "@/app/api/__generated__/models/setupRequirementsResponse";
import { useT } from "@/lib/i18n";
import type { ToolUIPart } from "ai";
import { MorphingTextAnimation } from "../../components/MorphingTextAnimation/MorphingTextAnimation";
import { SetupRequirementsCard } from "../../components/SetupRequirementsCard/SetupRequirementsCard";
import {
  isUnparseableJsonOutput,
  reportCorruptedToolOutput,
} from "../../helpers/toolOutput";

type Props = {
  part: ToolUIPart;
};

function parseJson(raw: unknown): unknown {
  if (typeof raw === "string") {
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }
  return raw;
}

function parseOutput(raw: unknown): SetupRequirementsResponse | null {
  const parsed = parseJson(raw);
  if (parsed && typeof parsed === "object" && "setup_info" in parsed) {
    return parsed as SetupRequirementsResponse;
  }
  return null;
}

function parseError(raw: unknown): string | null {
  const parsed = parseJson(raw);
  if (parsed && typeof parsed === "object" && "message" in parsed) {
    return String((parsed as { message: unknown }).message);
  }
  return null;
}

export function ConnectIntegrationTool({ part }: Props) {
  const t = useT();
  const isStreaming =
    part.state === "input-streaming" || part.state === "input-available";

  const output =
    part.state === "output-available"
      ? parseOutput((part as { output?: unknown }).output)
      : null;

  const isCorrupted =
    part.state === "output-available" &&
    !output &&
    isUnparseableJsonOutput((part as { output?: unknown }).output);
  if (isCorrupted) reportCorruptedToolOutput(part.toolCallId, part.type);

  const isError = part.state === "output-error" || isCorrupted;

  // Only genuine output-error states get the generic failure message; a
  // corrupted payload renders its own dedicated message below.
  const errorMessage =
    part.state === "output-error"
      ? (parseError((part as { output?: unknown }).output) ??
        t("chatTools3.connect.errorFallback"))
      : null;

  const rawProvider =
    (part as { input?: { provider?: string } }).input?.provider ?? "";
  const providerName =
    output?.setup_info?.agent_name ??
    // Sanitize LLM-controlled provider slug: trim and cap at 64 chars to
    // prevent runaway text in the DOM.
    (rawProvider
      ? rawProvider.trim().slice(0, 64)
      : t("chatTools3.connect.defaultName"));

  const label = isStreaming
    ? t("chatTools3.connect.connecting", { name: providerName })
    : isError
      ? t("chatTools3.connect.failed", { name: providerName })
      : output
        ? t("chatTools3.connect.connect", {
            name: output.setup_info?.agent_name ?? providerName,
          })
        : t("chatTools3.connect.connect", { name: providerName });

  return (
    <div className="py-2">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <MorphingTextAnimation
          text={label}
          className={isError ? "text-error" : undefined}
        />
      </div>

      {isError && errorMessage && (
        <p className="mt-1 text-sm text-error">{errorMessage}</p>
      )}

      {isCorrupted && (
        <p className="mt-1 text-sm text-error">
          {t("chatTools3.connect.corrupted", { name: providerName })}
        </p>
      )}

      {output && (
        <div className="mt-2">
          <SetupRequirementsCard
            output={output}
            credentialsLabel={t("chatTools2.toolResult.namedCredentials", {
              name: output.setup_info?.agent_name ?? providerName,
            })}
            retryInstruction="I've connected my account. Please continue."
          />
        </div>
      )}
    </div>
  );
}
