import { ApiError } from "@/lib/autogpt-server-api/helpers";
import type { GraphValidationErrorResponse } from "@/lib/autogpt-server-api/types";
import { useNodeStore } from "../stores/nodeStore";
import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n/locale";
import { getMessage } from "@/lib/i18n/translate";

// A graph the backend refuses to save comes back as a structured validation
// error naming each node's bad fields, e.g. "Agent Output › Name: This field
// is required"; anything else is shown as it arrives.
export function describeSaveError(
  error: unknown,
  locale: Locale = DEFAULT_LOCALE,
) {
  if (isValidationError(error)) {
    return {
      title: getMessage(locale, "build5.saveError.validationTitle"),
      description: getMessage(locale, "build5.saveError.validationBody", {
        message: error.response.detail.message,
      }),
      variant: "destructive" as const,
    };
  }
  return {
    title: getMessage(locale, "build5.saveError.title"),
    description:
      error instanceof Error
        ? error.message
        : getMessage(locale, "build5.loadError.unexpected"),
    variant: "destructive" as const,
  };
}

// Like a refused run, the latest refusal replaces whatever was marked before.
export function markInvalidFields(error: unknown) {
  if (!isValidationError(error)) return;
  const { clearAllNodeErrors, setNodeErrorsForBackendId } =
    useNodeStore.getState();
  clearAllNodeErrors();
  Object.entries(error.response.detail.node_errors).forEach(
    ([nodeID, fieldErrors]) => setNodeErrorsForBackendId(nodeID, fieldErrors),
  );
}

function isValidationError(
  error: unknown,
): error is ApiError<GraphValidationErrorResponse> {
  return error instanceof ApiError && error.isGraphValidationError();
}
