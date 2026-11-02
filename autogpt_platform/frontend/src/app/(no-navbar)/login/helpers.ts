import type { EmailVerificationNotice } from "@/lib/auth/email-verification";
import type { MessageKey } from "@/lib/i18n/messages/en";

export const ACCOUNT_BANNED_NOTICE_KEY: MessageKey = "auth1.login.banned";

export const EMAIL_VERIFICATION_NOTICE_KEYS: Record<
  EmailVerificationNotice,
  MessageKey
> = {
  expired: "auth1.login.verificationExpired",
  verified: "auth1.login.verificationVerified",
};
