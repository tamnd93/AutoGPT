import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n/locale";
import { getMessage } from "@/lib/i18n/translate";

export type InstallWorkflowSource = "library" | "marketplace";

export const INSTALL_WORKFLOW_SOURCES: {
  id: InstallWorkflowSource;
  labelKey: "shared6.install.source.library" | "shared6.install.source.marketplace";
}[] = [
  { id: "library", labelKey: "shared6.install.source.library" },
  { id: "marketplace", labelKey: "shared6.install.source.marketplace" },
];

export type WorkflowInstallData =
  | { library_agent_id: string }
  | { store_listing_version_id: string };

/** Row subtitle: the workflow's own description, or a neutral source label.
 *  A user's own agent has no marketplace creator, so `creator_name` reads
 *  "Unknown" there. */
export function workflowSubtitle(
  description: string | null | undefined,
  locale: Locale = DEFAULT_LOCALE,
) {
  return (
    description?.trim() ||
    getMessage(locale, "shared6.install.fromYourLibrary")
  );
}
