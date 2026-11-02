"use client";

import { GraphTriggerInfo } from "@/app/api/__generated__/models/graphTriggerInfo";
import { LibraryAgentPreset } from "@/app/api/__generated__/models/libraryAgentPreset";
import { Button } from "@/components/atoms/Button/Button";
import { Text } from "@/components/atoms/Text/Text";
import { RunDetailCard } from "../../RunDetailCard/RunDetailCard";
import { Copy01Icon } from "@hugeicons/core-free-icons";
import { Icon } from "@/components/atoms/Icon/Icon";
import { useT } from "@/lib/i18n";

interface Props {
  template: LibraryAgentPreset;
  triggerSetupInfo: GraphTriggerInfo;
}

function getTriggerStatus(
  template: LibraryAgentPreset,
): "active" | "inactive" | "broken" {
  if (!template.webhook_id || !template.webhook) return "broken";
  return template.is_active ? "active" : "inactive";
}

export function WebhookTriggerCard({ template, triggerSetupInfo }: Props) {
  const t = useT();
  const status = getTriggerStatus(template);
  const webhook = template.webhook;

  function handleCopyWebhookUrl() {
    if (webhook?.url) {
      navigator.clipboard.writeText(webhook.url);
    }
  }

  return (
    <RunDetailCard title={t("library2.webhook.title")}>
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <Text variant="large-medium">
            {t("library2.webhook.statusLabel")}
          </Text>
          <span
            className={`rounded-full px-2 py-0.5 text-xs font-medium ${
              status === "active"
                ? // TODO(tokens): no exact role for bg-green-100 (#B7E2C7), text-green-800 (#0C5A29)
                  "bg-green-100 text-green-800"
                : status === "inactive"
                  ? // TODO(tokens): no exact role for bg-yellow-100 (#FCEBB0), text-yellow-800 (#876A00)
                    "bg-yellow-100 text-yellow-800"
                  : // TODO(tokens): no exact role for bg-red-100 (#FDECEC), text-red-800 (#832525)
                    "bg-red-100 text-red-800"
            }`}
          >
            {status === "active"
              ? t("library2.webhook.active")
              : status === "inactive"
                ? t("library2.webhook.inactive")
                : t("library2.webhook.broken")}
          </span>
        </div>

        {!template.webhook_id ? (
          <Text
            // TODO(tokens): no fitting role for text-red-600 #D93636; #D93636 is error-hover, a hover fill
            variant="body"
            className="text-red-600"
          >
            {t("library2.webhook.notAttached")}
          </Text>
        ) : !triggerSetupInfo.credentials_input_name && webhook ? (
          <div className="flex flex-col gap-2">
            <Text variant="body">{t("library2.webhook.ready")}</Text>
            <div className="flex flex-col gap-1">
              <Text variant="body-medium">
                {t("library2.webhook.urlLabel")}
              </Text>
              <div
                // TODO(tokens): no exact role for bg-gray-50 (#F9FAFB)
                className="flex gap-2 rounded-md bg-gray-50 p-2"
              >
                <code className="ph-no-capture flex-1 select-all text-sm">
                  {webhook.url}
                </code>
                <Button
                  variant="outline"
                  size="icon"
                  className="size-7 flex-none p-1"
                  onClick={handleCopyWebhookUrl}
                  title={t("library2.webhook.copyUrl")}
                >
                  <Icon icon={Copy01Icon} className="size-4" />
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <Text variant="body" className="text-muted-foreground">
            {template.is_active
              ? t("library2.webhook.workflowTriggerReady")
              : t("library2.webhook.workflowTriggerDisabled")}
          </Text>
        )}
      </div>
    </RunDetailCard>
  );
}
