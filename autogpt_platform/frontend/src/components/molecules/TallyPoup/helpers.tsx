import { toast } from "@/components/molecules/Toast/use-toast";
import type { MessageKey } from "@/lib/i18n/messages/en";
import { getMessage } from "@/lib/i18n/translate";

export type Translate = (
  key: MessageKey,
  values?: Record<string, string | number>,
) => string;

const english: Translate = (key, values) => getMessage("en", key, values);

const TALLY_EMBED_URL = "https://tally.so/widgets/embed.js";
export const FEEDBACK_TALLY_FORM_ID = "3yx2L0";
const FEEDBACK_FORM_URL = `https://tally.so/r/${FEEDBACK_TALLY_FORM_ID}`;

interface TallyPopupOptions {
  emoji?: { text: string; animation: string };
  hiddenFields?: Record<string, string>;
  onOpen?: () => void;
  onClose?: () => void;
}

interface TallyApi {
  openPopup: (formId: string, options?: TallyPopupOptions) => void;
}

declare global {
  interface Window {
    Tally?: TallyApi;
  }
}

let pendingLoad: Promise<TallyApi> | null = null;

export function loadTallyEmbed(): Promise<TallyApi> {
  if (window.Tally) return Promise.resolve(window.Tally);
  if (pendingLoad) return pendingLoad;

  pendingLoad = new Promise<TallyApi>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = TALLY_EMBED_URL;
    script.async = true;

    script.addEventListener("load", () => {
      pendingLoad = null;
      if (window.Tally) {
        resolve(window.Tally);
      } else {
        script.remove();
        reject(new Error("Tally script loaded without its API"));
      }
    });
    script.addEventListener("error", () => {
      pendingLoad = null;
      script.remove();
      reject(new Error("Tally script failed to load"));
    });

    document.head.appendChild(script);
  });

  return pendingLoad;
}

interface FeedbackContext {
  pageUrl: string;
  isAuthenticated: boolean | null;
}

export function getFeedbackHiddenFields(context: FeedbackContext) {
  return {
    pageUrl: context.pageUrl
      ? context.pageUrl.split("?")[0]
      : "not-initialized",
    isAuthenticated:
      context.isAuthenticated === null
        ? "unknown"
        : String(context.isAuthenticated),
  };
}

export function showFeedbackLoadError(t: Translate = english) {
  toast({
    title: t("shared4.tally.loadFailedTitle"),
    description: (
      <>
        {t("shared4.tally.loadFailedBody")}{" "}
        <a
          href={FEEDBACK_FORM_URL}
          target="_blank"
          rel="noopener noreferrer"
          data-slot="feedback-form-link"
          className="underline"
        >
          {t("shared4.tally.openNewTab")}
        </a>
      </>
    ),
    variant: "destructive",
    duration: 10000,
  });
}
