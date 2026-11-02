import { HelpItem } from "@/components/auth/help-item";
import { Card, CardContent } from "@/components/atoms/Card/Card";
import { AlertCircle, CheckCircle } from "lucide-react";
import { useT } from "@/lib/i18n";
import { BehaveAs } from "@/services/environment";

interface Props {
  type: "login" | "signup";
  message?: string | null;
  isError?: boolean;
  behaveAs?: BehaveAs;
}

export default function AuthFeedback({
  type,
  message = "",
  isError = false,
  behaveAs = BehaveAs.CLOUD,
}: Props) {
  const t = useT();
  const displayMessage =
    message || (isError ? t("auth1.feedback.genericError") : "");

  const isCloudMode = behaveAs === BehaveAs.CLOUD;
  const isLocalMode = behaveAs === BehaveAs.LOCAL;
  const showCloudHelp = isError && isCloudMode;
  const showLocalHelp = isError && isLocalMode;
  const isSignupFlow = type === "signup";
  const hasAnyHelpContent = showCloudHelp || showLocalHelp;

  const hasContent = displayMessage || hasAnyHelpContent;

  if (!hasContent) {
    return null;
  }

  return (
    <div className="mt-4 w-full space-y-4">
      {/* Message feedback */}
      {displayMessage && (
        <div className="text-center text-sm font-medium leading-normal">
          {isError ? (
            <div className="flex items-center justify-center space-x-2 text-error">
              <AlertCircle className="h-4 w-4" />
              <span>{displayMessage}</span>
            </div>
          ) : (
            <div className="flex items-center justify-center space-x-2 text-success">
              <CheckCircle className="h-4 w-4" />
              <span>{displayMessage}</span>
            </div>
          )}
        </div>
      )}

      {/* Cloud-specific help */}
      {showCloudHelp &&
        (isSignupFlow ? (
          <Card
            variant="outlined"
            // TODO(tokens): no exact role for border-slate-200 (#CFD4DB)
            className="overflow-hidden rounded-lg border border-slate-200 bg-surface shadow-sm"
          >
            <CardContent className="p-0">
              <div
                // TODO(tokens): no exact role for divide-slate-100 (#EFF1F4)
                className="divide-y divide-slate-100"
              >
                <span className="my-3 block text-center text-sm font-medium text-error">
                  {t("auth1.feedback.signupNotAllowed")}
                </span>
                <HelpItem
                  title={t("auth1.feedback.betaTitle")}
                  description={t("auth1.feedback.joinWaitlistDesc")}
                  linkText={t("auth1.feedback.waitlistLink")}
                  href="https://agpt.co/waitlist"
                />
                <HelpItem title={t("auth1.feedback.sameEmail")} />
                <HelpItem
                  title={t("auth1.feedback.selfHostTitle")}
                  description={t("auth1.feedback.visitOur")}
                  linkText={t("auth1.feedback.githubRepo")}
                  href="https://github.com/Significant-Gravitas/AutoGPT"
                />
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card
            variant="outlined"
            // TODO(tokens): no exact role for border-slate-200 (#CFD4DB)
            className="overflow-hidden rounded-lg border border-slate-200 bg-surface shadow-sm"
          >
            <CardContent className="p-0">
              <div
                // TODO(tokens): no exact role for divide-slate-100 (#EFF1F4)
                className="divide-y divide-slate-100"
              >
                <HelpItem
                  title={t("auth1.feedback.loginTrouble")}
                  description={t("auth1.feedback.makeSureSignedUp")}
                  linkText={t("auth1.feedback.signedUp")}
                  href="/signup"
                />
              </div>
            </CardContent>
          </Card>
        ))}

      {/* Local-specific help */}
      {showLocalHelp && (
        <Card
          variant="outlined"
          // TODO(tokens): no exact role for border-slate-200 (#CFD4DB)
          className="w-full overflow-hidden rounded-lg border border-slate-200 bg-surface shadow-sm"
        >
          <div
            // TODO(tokens): no exact role for divide-slate-100 (#EFF1F4)
            className="w-full divide-y divide-slate-100"
          >
            <HelpItem
              title={t("auth1.feedback.localTrouble")}
              description={t("auth1.feedback.askHelp")}
              linkText={t("auth1.feedback.discord")}
              href="https://discord.gg/autogpt"
            />

            <HelpItem
              title={t("auth1.feedback.bugTitle")}
              description={t("auth1.feedback.openIssue")}
              linkText={t("auth1.feedback.github")}
              href="https://github.com/Significant-Gravitas/AutoGPT"
            />

            <HelpItem
              title={t("auth1.feedback.cloudTitle")}
              description={t("auth1.feedback.joinOur")}
              linkText={t("auth1.feedback.waitlistHere")}
              href="https://agpt.co/waitlist"
            />
          </div>
        </Card>
      )}
    </div>
  );
}
