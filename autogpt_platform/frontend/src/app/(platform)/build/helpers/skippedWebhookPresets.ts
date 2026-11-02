import type { SkippedWebhookPreset } from "@/app/api/__generated__/models/skippedWebhookPreset";
import type { toast } from "@/components/molecules/Toast/use-toast";
import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n/locale";
import { getMessage } from "@/lib/i18n/translate";

// When a new graph version swaps or reconfigures the trigger block, presets
// whose webhook was registered for the old trigger are left pinned to their
// previous version so their existing webhook keeps working. Let the user know
// they need to reconfigure the trigger on the new version.
export function notifySkippedWebhookPresets(
  toastFn: typeof toast,
  skippedPresets: SkippedWebhookPreset[] | undefined | null,
  locale: Locale = DEFAULT_LOCALE,
) {
  if (!skippedPresets || skippedPresets.length === 0) return;

  const names = skippedPresets.map((preset) => `"${preset.name}"`).join(", ");
  const single = skippedPresets.length === 1;

  toastFn({
    variant: "info",
    duration: 10000,
    title: single
      ? getMessage(locale, "build5.skipped.singleTitle")
      : getMessage(locale, "build5.skipped.manyTitle"),
    description: single
      ? getMessage(locale, "build5.skipped.singleBody", { names })
      : getMessage(locale, "build5.skipped.manyBody", { names }),
  });
}
