import {
  PAYWALL_TOAST_KEY,
  PaywallToastAction,
  PaywallToastDescription,
} from "@/components/contextual/PaywallToast/PaywallToast";
import {
  isPaywallError,
  PAYWALL_TOAST_DURATION_MS,
} from "@/components/contextual/PaywallToast/helpers";
import { toast } from "@/components/molecules/Toast/use-toast";
import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n/locale";
import { getMessage } from "@/lib/i18n/translate";
import { describeSendFailure } from "../components/ChatInput/helpers";
import { SentNowError } from "../components/SendAtReset/helpers";
import { ReportedSendError } from "./reportedSendError";

interface Args {
  title: string;
  error: unknown;
  /** Lowercase clause saying where the user's text went. */
  recovery: string;
  /** Replaces `recovery` on the paywall toast when `recovery` tells the user
   *  to retry, which can't succeed until they have a plan. */
  paywallRecovery?: string;
  /** Locale for the toast copy; defaults to English. */
  locale?: Locale;
}

/** The single toast for a send that failed. Every send path reports through
 *  here so one failure is one toast. */
export function toastSendFailure({
  title,
  error,
  recovery,
  paywallRecovery = recovery,
  locale = DEFAULT_LOCALE,
}: Args) {
  // A send Send at reset made at once fails the way that send did.
  const failure = error instanceof SentNowError ? error.cause : error;
  if (failure instanceof ReportedSendError) return;
  if (isPaywallError(failure)) {
    toast({
      title: getMessage(locale, "chatStates3.sendFailure.paywallTitle"),
      description: <PaywallToastDescription recovery={paywallRecovery} />,
      variant: "destructive",
      duration: PAYWALL_TOAST_DURATION_MS,
      replaceKey: PAYWALL_TOAST_KEY,
      action: <PaywallToastAction />,
    });
    return;
  }
  toast({
    title,
    description: describeSendFailure(failure, recovery),
    variant: "destructive",
  });
}
