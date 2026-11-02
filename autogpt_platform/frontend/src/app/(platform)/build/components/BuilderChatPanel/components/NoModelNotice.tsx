import { SELF_HOSTED_MODELS_DOCS_URL } from "@/app/(platform)/copilot/helpers/reportedSendError";
import { Icon } from "@/components/atoms/Icon/Icon";
import { Alert02Icon } from "@hugeicons/core-free-icons";
import { Text } from "@/components/atoms/Text/Text";
import { useT } from "@/lib/i18n";

// The builder chat runs only on this server's own model, so unlike the main
// chat's notice this one has no ChatGPT-plan route to offer.
export function NoModelNotice() {
  const t = useT();
  return (
    <div className="flex flex-1 items-center justify-center px-4 py-6">
      <Text
        variant="body-tight"
        as="div"
        role="status"
        aria-label={t("build1.noModel.aria")}
        // TODO(tokens): no exact role: text-amber-900 #78350F
        className="flex w-full items-start gap-2 rounded-2xl bg-warning-surface px-3 py-2 text-left text-amber-900"
      >
        <Icon
          icon={Alert02Icon}
          className="mt-0.5 h-4 w-4 shrink-0"
          aria-hidden
        />
        <span className="min-w-0 flex-1">
          {t("build1.noModel.body")}{" "}
          <a
            href={SELF_HOSTED_MODELS_DOCS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2"
          >
            <Text variant="body-medium-tight" as="span" tone="inherit">
              {t("build1.noModel.setupGuide")}
            </Text>
          </a>
          .
        </span>
      </Text>
    </div>
  );
}
