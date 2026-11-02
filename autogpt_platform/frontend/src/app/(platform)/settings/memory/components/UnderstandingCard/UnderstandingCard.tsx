"use client";

import { Button } from "@/components/atoms/Button/Button";
import { Text } from "@/components/atoms/Text/Text";
import { Dialog } from "@/components/molecules/Dialog/Dialog";
import { ErrorCard } from "@/components/molecules/ErrorCard/ErrorCard";
import { useState } from "react";
import { useT } from "@/lib/i18n";
import { useUnderstandingCard } from "./useUnderstandingCard";

const LONG_VALUE_CHARS = 280;

export function UnderstandingCard() {
  const t = useT();
  const {
    rows,
    isError,
    error,
    refetch,
    isConfirmOpen,
    setIsConfirmOpen,
    forget,
    isForgetting,
  } = useUnderstandingCard();

  if (isError)
    return (
      <ErrorCard
        responseError={error || undefined}
        context={t("settingsRest2.memory.understanding.errorContext")}
        onRetry={refetch}
      />
    );
  if (!rows.length) return null;

  return (
    <section
      aria-labelledby="understanding-title"
      className="flex flex-col rounded-[18px] border border-zinc-200 bg-white px-4 py-4 shadow-[0_1px_2px_rgba(15,15,20,0.04)]"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex min-w-0 flex-col">
          <Text
            variant="body-medium"
            as="h2"
            id="understanding-title"
            className="text-textBlack"
          >
            {t("settingsRest2.memory.understanding.title")}
          </Text>
          <Text variant="small" as="span" className="text-zinc-500">
            {t("errors5.understanding.body")}
          </Text>
        </div>
        <Dialog
          title={t("errors5.understanding.forgetTitle")}
          styling={{ maxWidth: "440px" }}
          controlled={{ isOpen: isConfirmOpen, set: setIsConfirmOpen }}
        >
          <Dialog.Trigger>
            <Button variant="secondary" size="small">
              {t("errors5.understanding.forgetTrigger")}
            </Button>
          </Dialog.Trigger>
          <Dialog.Content>
            <div className="flex flex-col gap-4">
              <Text variant="small" as="p" className="text-zinc-600">
                {t("errors5.understanding.forgetBody")}
              </Text>
              <div className="flex justify-end gap-2">
                <Button
                  variant="secondary"
                  size="small"
                  onClick={() => setIsConfirmOpen(false)}
                >
                  {t("errors5.understanding.cancel")}
                </Button>
                <Button
                  variant="destructive"
                  size="small"
                  loading={isForgetting}
                  onClick={forget}
                >
                  {t("errors5.understanding.forget")}
                </Button>
              </div>
            </div>
          </Dialog.Content>
        </Dialog>
      </div>

      <dl className="mt-2 flex flex-col divide-y divide-zinc-100">
        {rows.map((row) => (
          <div key={row.label} className="flex flex-col gap-0.5 py-2">
            <Text variant="small-medium" as="dt" className="text-zinc-500">
              {row.label}
            </Text>
            {row.values.map((value) => (
              <UnderstandingValue key={value} value={value} />
            ))}
          </div>
        ))}
      </dl>
    </section>
  );
}

function UnderstandingValue({ value }: { value: string }) {
  const t = useT();
  const [isExpanded, setIsExpanded] = useState(false);
  // By code point, so the cut never splits an emoji's surrogate pair.
  const chars = Array.from(value);
  const isLong = chars.length > LONG_VALUE_CHARS;
  const shown =
    isLong && !isExpanded
      ? `${chars.slice(0, LONG_VALUE_CHARS).join("")}…`
      : value;

  return (
    <dd className="whitespace-pre-line text-sm text-zinc-800">
      {shown}
      {isLong ? (
        <button
          type="button"
          className="ml-1 text-zinc-500 underline"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded
            ? t("settingsRest2.memory.understanding.showLess")
            : t("settingsRest2.memory.understanding.showAll")}
        </button>
      ) : null}
    </dd>
  );
}
