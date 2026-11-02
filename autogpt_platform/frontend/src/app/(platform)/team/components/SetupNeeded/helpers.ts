import type { ExpertSetupItem } from "@/app/api/__generated__/models/expertSetupItem";
import { formatProviderName } from "@/components/contextual/IntegrationsPanel/helpers";
import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n/locale";
import { getMessage } from "@/lib/i18n/translate";

export function isCredentialItem(item: ExpertSetupItem) {
  return item.resolution === "connect" || item.resolution === "allow";
}

export function getSetupRowCopy(
  item: ExpertSetupItem,
  locale: Locale = DEFAULT_LOCALE,
) {
  const workflowName =
    item.workflow_name ?? getMessage(locale, "team8.setupRow.workflowFallback");
  if (isCredentialItem(item)) {
    const provider = item.providers[0];
    return {
      title: getMessage(locale, "team8.setupRow.credentialTitle", {
        provider: provider
          ? formatProviderName(provider)
          : getMessage(locale, "team8.setupRow.serviceFallback"),
        expert: item.expert_name,
      }),
      detail: getMessage(locale, "team8.setupRow.credentialDetail", {
        workflow: workflowName,
      }),
    };
  }
  return {
    title: getMessage(locale, "team8.setupRow.scheduleTitle", {
      workflow: workflowName,
      expert: item.expert_name,
    }),
    detail:
      item.resolution === "inputs"
        ? getMessage(locale, "team8.setupRow.inputsDetail", {
            list: formatInputList(item.missing_inputs ?? [], locale),
          })
        : getMessage(locale, "team8.setupRow.readyDetail"),
  };
}

function formatInputList(names: string[], locale: Locale = DEFAULT_LOCALE) {
  if (names.length === 0)
    return getMessage(locale, "team8.setupRow.inputsFallback");
  if (names.length === 1) return names[0];
  return getMessage(locale, "team8.setupRow.inputsJoiner", {
    rest: names.slice(0, -1).join(", "),
    last: names[names.length - 1],
  });
}
