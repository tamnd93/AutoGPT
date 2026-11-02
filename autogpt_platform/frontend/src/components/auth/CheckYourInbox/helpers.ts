// Better Auth allows 3 verification emails per IP a minute, and one went out
// the moment this screen appeared.
export const RESEND_COOLDOWN_SECONDS = 60;

// Focused when the screen replaces the form, so screen readers announce it.
export const CHECK_YOUR_INBOX_HEADING_ID = "check-your-inbox-heading";

export const CHECK_YOUR_INBOX_KEYS = {
  signup: {
    title: "auth2.inbox.signup.title",
    action: "auth2.inbox.signup.action",
    backPrompt: "auth2.inbox.signup.backPrompt",
    backLabel: "auth2.inbox.signup.backLabel",
  },
  login: {
    title: "auth2.inbox.login.title",
    action: "auth2.inbox.login.action",
    backPrompt: "auth2.inbox.login.backPrompt",
    backLabel: "auth2.inbox.login.backLabel",
  },
} as const;

export type CheckYourInboxReason = keyof typeof CHECK_YOUR_INBOX_KEYS;
