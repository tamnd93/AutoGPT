import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n/locale";
import { getMessage } from "@/lib/i18n/translate";
import { environment } from "@/services/environment";

import { getCopilotAuthHeaders } from "../helpers";

export async function synthesizeSpeech(
  text: string,
  sessionId: string | null,
  locale: Locale = DEFAULT_LOCALE,
): Promise<Blob> {
  const response = await fetch(
    `${environment.getAGPTServerBaseUrl()}/api/chat/speech`,
    {
      method: "POST",
      headers: {
        ...(await getCopilotAuthHeaders()),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text, session_id: sessionId }),
    },
  );

  if (!response.ok) {
    throw new Error(speechFailure(response.status, locale));
  }

  return response.blob();
}

export async function transcribeUtterance(
  audio: Blob,
  locale: Locale = DEFAULT_LOCALE,
): Promise<string> {
  const body = new FormData();
  body.append("audio", audio);

  const response = await fetch("/api/transcribe", { method: "POST", body });
  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data.error || getMessage(locale, "voice1.error.transcription"));
  }

  const data = await response.json();
  return typeof data.text === "string" ? data.text : "";
}

/**
 * The spend pre-flight refuses before it synthesises, so these are the
 * statuses a user actually meets. A bare code tells them nothing about what
 * to do next.
 */
function speechFailure(
  status: number,
  locale: Locale = DEFAULT_LOCALE,
): string {
  if (status === 429) {
    return getMessage(locale, "voice1.error.usageLimit");
  }
  if (status === 402) {
    return getMessage(locale, "voice1.error.subscription");
  }
  if (status === 503) {
    return getMessage(locale, "voice1.error.unavailable");
  }
  return getMessage(locale, "voice1.error.synthesisFailed", { status });
}
