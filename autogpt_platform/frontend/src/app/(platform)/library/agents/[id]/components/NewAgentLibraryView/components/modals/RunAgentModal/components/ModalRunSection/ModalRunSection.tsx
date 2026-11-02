import { Input } from "@/components/atoms/Input/Input";
import { CredentialsGroupedView } from "@/components/contextual/CredentialsInput/components/CredentialsGroupedView/CredentialsGroupedView";
import { InformationTooltip } from "@/components/molecules/InformationTooltip/InformationTooltip";
import { useMemo } from "react";
import { RunAgentInputs } from "../../../RunAgentInputs/RunAgentInputs";
import { useRunAgentModalContext } from "../../context";
import { ModalSection } from "../ModalSection/ModalSection";
import { WebhookTriggerBanner } from "../WebhookTriggerBanner/WebhookTriggerBanner";
import { useT } from "@/lib/i18n";

export function ModalRunSection() {
  const t = useT();
  const {
    agent,
    defaultRunType,
    presetName,
    setPresetName,
    presetDescription,
    setPresetDescription,
    inputValues,
    setInputValue,
    agentInputFields,
    agentCredentialsInputFields,
    inputCredentials,
    setInputCredentialsValue,
  } = useRunAgentModalContext();

  const inputFields = Object.entries(agentInputFields || {});

  const credentialFields = useMemo(() => {
    if (!agentCredentialsInputFields) return [];
    return Object.entries(agentCredentialsInputFields);
  }, [agentCredentialsInputFields]);

  const requiredCredentials = new Set(
    (agent.credentials_input_schema?.required as string[]) || [],
  );

  return (
    <div className="flex flex-col gap-4">
      {defaultRunType === "automatic-trigger" ||
      defaultRunType === "manual-trigger" ? (
        <ModalSection
          title={t("library1.runSection.triggerTitle")}
          subtitle={t("library1.runSection.triggerSubtitle")}
        >
          <WebhookTriggerBanner />
          <div className="flex flex-col gap-4">
            <div className="flex flex-col space-y-2">
              <label className="flex items-center gap-1 text-sm font-medium">
                {t("library1.runSection.triggerName")}
                <InformationTooltip
                  description={t("library1.runSection.triggerNameTooltip")}
                />
              </label>
              <Input
                id="trigger_name"
                label={t("library1.runSection.triggerName")}
                size="small"
                hideLabel
                value={presetName}
                placeholder={t("library1.runSection.triggerNamePlaceholder")}
                onChange={(e) => setPresetName(e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label className="flex items-center gap-1 text-sm font-medium">
                {t("library1.runSection.triggerDescription")}
                <InformationTooltip
                  description={t(
                    "library1.runSection.triggerDescriptionTooltip",
                  )}
                />
              </label>
              <Input
                id="trigger_description"
                label={t("library1.runSection.triggerDescription")}
                size="small"
                hideLabel
                value={presetDescription}
                placeholder={t(
                  "library1.runSection.triggerDescriptionPlaceholder",
                )}
                onChange={(e) => setPresetDescription(e.target.value)}
              />
            </div>
          </div>
        </ModalSection>
      ) : null}

      {inputFields.length > 0 ? (
        <ModalSection
          title={t("library1.runSection.inputsTitle")}
          subtitle={t("library1.runSection.inputsSubtitle")}
        >
          {inputFields.map(([key, inputSubSchema]) => (
            <RunAgentInputs
              key={key}
              schema={inputSubSchema}
              value={inputValues[key] ?? inputSubSchema.default}
              placeholder={inputSubSchema.description}
              onChange={(value) => setInputValue(key, value)}
              data-testid={`agent-input-${key}`}
            />
          ))}
        </ModalSection>
      ) : null}

      {credentialFields.length > 0 ? (
        <ModalSection
          title={t("library1.runSection.credentialsTitle")}
          subtitle={t("library1.runSection.credentialsSubtitle")}
        >
          <CredentialsGroupedView
            credentialFields={credentialFields}
            requiredCredentials={requiredCredentials}
            inputCredentials={inputCredentials}
            inputValues={inputValues}
            onCredentialChange={setInputCredentialsValue}
          />
        </ModalSection>
      ) : null}
    </div>
  );
}
