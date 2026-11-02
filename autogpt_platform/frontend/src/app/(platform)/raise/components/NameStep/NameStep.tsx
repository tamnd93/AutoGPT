"use client";

import { Button } from "@/components/atoms/Button/Button";
import { Input } from "@/components/atoms/Input/Input";
import { useT } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { bubbleClassFor } from "../ColorStep/helpers";
import { useNameStep } from "./useNameStep";

interface Props {
  selectedName: string | null;
  suggestions: string[];
  color: string | null;
  onSubmit: (name: string) => void;
}

export function NameStep({
  selectedName,
  suggestions,
  color,
  onSubmit,
}: Props) {
  const t = useT();
  const { custom, setCustom, trimmed, submitCustom } = useNameStep({
    onSubmit,
  });
  // Once a name is picked the step collapses to that one chip, held in the
  // state it had on hover.
  const chips = selectedName ? [selectedName] : suggestions;

  return (
    <div className="flex flex-col items-end gap-4">
      <div
        role="group"
        aria-label={t("team1.name.suggested")}
        className="flex flex-wrap justify-end gap-2.5"
      >
        {chips.map((chip) => (
          <button
            key={chip}
            type="button"
            onClick={() => onSubmit(chip)}
            disabled={Boolean(selectedName)}
            aria-pressed={selectedName ? true : undefined}
            className={cn(
              "rounded-full border px-5 py-2.5 text-sm font-medium text-foreground transition-colors",
              selectedName
                ? (bubbleClassFor(color) ?? "border-accent bg-accent/5")
                : "border-border bg-background hover:border-accent hover:bg-accent/5",
            )}
          >
            {chip}
          </button>
        ))}
      </div>
      {selectedName ? null : (
        <span
          aria-hidden
          className="mr-4 text-xs font-medium uppercase tracking-caps text-muted-foreground"
        >
          {t("team1.common.or")}
        </span>
      )}
      {selectedName ? null : (
        <form onSubmit={submitCustom} className="flex items-center gap-2">
          <Input
            id="raise-name"
            label={t("team1.name.ownLabel")}
            hideLabel
            size="small"
            value={custom}
            onChange={(event) => setCustom(event.target.value)}
            placeholder={t("team1.name.placeholder")}
            maxLength={100}
            wrapperClassName="mb-0 w-full max-w-[16rem] [&_input]:h-[2.625rem] [&_input]:py-3"
          />
          <Button
            type="submit"
            variant="primary"
            size="small"
            disabled={!trimmed}
            className="h-[2.625rem] rounded-xl py-3"
          >
            {t("team1.name.submit")}
          </Button>
        </form>
      )}
    </div>
  );
}
