export const auth2En = {
  "auth2.inbox.signup.title": "Check your inbox",
  "auth2.inbox.signup.action": "continue",
  "auth2.inbox.signup.backPrompt": "Wrong address?",
  "auth2.inbox.signup.backLabel": "Start again",
  "auth2.inbox.login.title": "Verify your email to log in",
  "auth2.inbox.login.action": "log in",
  "auth2.inbox.login.backPrompt": "Wrong account?",
  "auth2.inbox.login.backLabel": "Back to log in",
  "auth2.inbox.sentPrefix": "We sent an email to",
  "auth2.inbox.sentSuffix": ". Open the link in it to {action}.",
  "auth2.inbox.spam": "Can't find it? Check your spam folder.",
  "auth2.inbox.resendIn": "Resend email in {seconds}s",
  "auth2.inbox.resend": "Resend email",
  "auth2.inbox.sentToast": "Email sent to {email}",
  "auth2.inbox.resendFailedTitle": "We couldn't send the email",
  "auth2.inbox.resendRateLimited":
    "Too many attempts. Please try again in a few minutes.",
  "auth2.inbox.resendRetry": "Please try again in a moment.",

  "auth2.emailNotAllowed.title": "Email Not Allowed",

  "auth2.expired.title":
    "Your reset password link has expired or has already been used",
  "auth2.expired.body": "Click below to request a new password reset link.",
  "auth2.expired.request": "Request a New Link",
  "auth2.expired.haveAccess": "Already have access?",
  "auth2.expired.login": "Log in here",

  "auth2.google.connecting": "Connecting...",
  "auth2.google.continue": "Continue with Google",

  "auth2.mobile.title": "Heads up: AutoGPT works best on desktop",
  "auth2.mobile.body":
    "Some features may be limited on mobile. For the best experience, consider switching to a desktop.",

  "auth2.waitlist.title": "We're in closed beta",
  "auth2.waitlist.body":
    "Looks like your email isn't in our early access list just yet. Join the waitlist and we will let you know the moment we open up access!",
  "auth2.waitlist.join": "Join Waitlist",
  "auth2.waitlist.backToLogin": "Back to Login",
  "auth2.waitlist.footerPrefix":
    "Already joined? Double-check you are using the same email you signed up with. Need a hand? Emails us at",
  "auth2.waitlist.footerOr": "or",
  "auth2.waitlist.footerDiscord": "message us on Discord",
  "auth2.waitlist.selfHostTitle": "This email can't sign up here",
  "auth2.waitlist.selfHostBody":
    "This instance only allows approved emails. Ask your administrator to add yours, or sign up with an email they have already approved.",
} as const;
